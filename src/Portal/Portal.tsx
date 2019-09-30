/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-27 23:35:17
 * @Last Modified by: liuyz
 * @Last Modified time: 2019-04-18 14:13:14
 * @Content: 传送门组件（用于将组件显示与根结构下）
 */
import * as React from 'react'
import { View, ViewStyle, DeviceEventEmitter } from 'react-native'

import { PortalGuard } from './PortalGuard'
import { PortalConsumer } from './PortalConsumer'
import { ADD_TYPE, REMOVE_TYPE } from './constant'
import map from 'lodash/map'

export interface IElType {
  key: number
  el: React.ReactNode
}

export interface IPortalProps {
  style?: ViewStyle
  /** 卸载或加载的事件名 */
  eventName?: string
}

export interface IPortalState {
  elems: IElType[]
}

const portal = new PortalGuard()

export default class PortalComponent extends React.Component<
  IPortalProps,
  IPortalState
> {
  static add = portal.add
  static remove = portal.remove
  static update = portal.update
  static Consumer = PortalConsumer

  /** 删除所有与Portal相关的事件绑定 */
  static removeAllListener = () => {
    DeviceEventEmitter.removeAllListeners(ADD_TYPE)
    DeviceEventEmitter.removeAllListeners(REMOVE_TYPE)
  }

  constructor(props: IPortalProps) {
    super(props)
    this.state = {
      elems: [],
    }
  }

  addListener = () => {
    DeviceEventEmitter.addListener(ADD_TYPE, this._mount)
    DeviceEventEmitter.addListener(REMOVE_TYPE, this._unmount)
  }

  removeListener = () => {
    DeviceEventEmitter.removeListener(ADD_TYPE, this._mount)
    DeviceEventEmitter.removeListener(REMOVE_TYPE, this._unmount)
  }

  handleListenerChange = (e: boolean) => {
    const { eventName } = this.props
    if (!eventName) {
      return
    }
    this.removeListener()
    if (e) {
      this.addListener()
    }
  }

  componentDidMount() {
    const { eventName } = this.props
    this.addListener()
    if (eventName) {
      DeviceEventEmitter.addListener(eventName, this.handleListenerChange)
    }
  }

  componentWillUnmount() {
    const { eventName } = this.props
    this.removeListener()
    if (eventName) {
      DeviceEventEmitter.removeListener(eventName, this.handleListenerChange)
    }
  }

  render() {
    const { elems } = this.state
    const { children, style = {} } = this.props
    return (
      <View style={{ flex: 1, position: 'relative', ...style }}>
        {children}
        {map(elems, (item) => {
          const el = item.el as React.ReactElement
          const prevStyle: ViewStyle = el.props.style || {}
          const props = {
            key: item.key,
            // using zIndex, let the element added latter render on the upper layer
            style: { ...prevStyle, zIndex: item.key },
          }
          return React.cloneElement(el, props)
        })}
      </View>
    )
  }

  /**
   * 增加或者更新内部元素
   */
  private _mount = ({ key, el }: { key: number; el: React.ReactNode }) => {
    const { elems } = this.state
    /**
     * 如果targetElemIndex 大于 -1:
     * --> 说明本次 _mount 为 update 操作 -> 直接修改 el
     */
    const targetElemIndex = elems.findIndex((item) => item.key === key)
    if (targetElemIndex > -1) {
      elems[targetElemIndex].el = el
      this.setState({
        elems,
      })
    } else {
      this.setState({
        elems: [...this.state.elems, { key, el }],
      })
    }
  }

  /**
   * 卸载 key 值的元素
   */
  private _unmount = ({ key }: { key: number }) => {
    this.setState({
      elems: this.state.elems.filter((item) => item.key !== key),
    })
  }
}

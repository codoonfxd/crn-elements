/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-04-01 16:57:13
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-04-01 17:10:47
 * @Content: 主题(TODO)、国际化(TODO)、提供Portal的容器组件
 */
import * as React from 'react'
import Portal, { IPortalProps } from '../Portal'

export type IProviderProps = IPortalProps

export default class Provider extends React.Component<IProviderProps> {
  render() {
    const { children, style, eventName } = this.props
    return (
      <Portal style={style} eventName={eventName}>
        {children}
      </Portal>
    )
  }
}

/*
 * @Author: ccb(chencanbing@aliyun.com)
 * @Date: 2019-04-10 16:41:30
 * @Last Modified by: ccb(chencanbing@aliyun.com)
 * @Last Modified time: 2019-04-10 19:40:48
 * @Content:
 */
import React, { Component, ReactNode } from 'react'
import { CANCEL_IMG, THEME_COLOR } from '../lib/constant'
import {
  Text,
  View,
  ViewStyle,
  TextStyle,
  Image,
  TouchableHighlight,
} from 'react-native'
import Color from 'color'
// import Touchable from 'react-native-platform-touchable'

interface IProps {
  wraperStyle?: ViewStyle // 容器样式
  textStyle?: TextStyle // 文本样式
  type: 'flat' | 'round' // 组件类型
  border: boolean | string // 边框配置
  title: ReactNode
  showClose: boolean // 是否展示关闭按钮
  onPress?(): any
  onClose?(): any
}
// 默认配置样式
const styles = {
  wraperStyle: {
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    backgroundColor: THEME_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wraperRound: {
    borderRadius: 3,
  },
  border: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Color(THEME_COLOR)
      .darken(0.2)
      .string(),
  },
  textStyle: {
    color: '#fff',
    fontSize: 13,
  },
  closeBtn: {
    width: 12,
    height: 12,
  },
}
export default class Tag extends Component<IProps> {
  static defaultProps = {
    wraperStyle: styles.wraperStyle,
    textStyle: styles.textStyle,
    type: 'flat',
    border: true,
    title: '',
    showClose: true,
  }
  state = {
    show: true,
    isPressed: false,
  }
  // 合并样式
  public MergeStyles(key: 'textStyle' | 'wraperStyle' | 'border'): any {
    if (this.props[key]) {
      return Object.assign({}, styles[key], this.props[key])
    }
    return styles[key]
  }
  // 关闭处理事件
  onClose = () => {
    const { onClose } = this.props
    this.setState({
      show: false,
    })
    if (!onClose) {
      return false
    }
    onClose()
  }
  // 点击事件
  onPress = () => {
    const { onPress } = this.props
    this.setState({
      isPressed: true,
    })
    if (!onPress) {
      return false
    }
    onPress()
  }
  // 松手事件
  onPressOut = () => {
    this.setState({
      isPressed: false,
    })
  }
  // 渲染内容
  renderTitle() {
    const { title } = this.props
    const textStyle = this.MergeStyles('textStyle')
    if (typeof title === 'string') {
      return <Text style={textStyle}>{title}</Text>
    }
    return title
  }
  // 渲染关闭按钮
  renderCancelBtn() {
    const { showClose } = this.props
    if (!showClose) {
      return null
    }
    return (
      <TouchableHighlight style={[styles.closeBtn]} onPress={this.onClose}>
        <Image source={{ uri: CANCEL_IMG }} style={styles.closeBtn} />
      </TouchableHighlight>
    )
  }
  render() {
    const { type, border, onPress } = this.props
    const { show, isPressed } = this.state
    if (!show) {
      return null
    }
    const wraperStyle = this.MergeStyles('wraperStyle')

    let borderStyle = {
      borderColor: Color(wraperStyle.backgroundColor)
        .darken(0.2)
        .string(),
    }
    const pressedWraperStyle = {
      backgroundColor: borderStyle,
    }
    borderStyle = { ...borderStyle, ...this.MergeStyles('border') }
    if (!onPress) {
      return (
        <View
          style={[
            type === 'round' && styles.wraperRound,
            !!border && borderStyle,
            wraperStyle,
          ]}
        >
          {this.renderTitle()}
          {this.renderCancelBtn()}
        </View>
      )
    }
    return (
      <TouchableHighlight onPress={this.onPress} onPressOut={this.onPressOut}>
        <View
          style={[
            type === 'round' && styles.wraperRound,
            !!border && borderStyle,
            wraperStyle,
            isPressed && pressedWraperStyle,
          ]}
        >
          {this.renderTitle()}
          {this.renderCancelBtn()}
        </View>
      </TouchableHighlight>
    )
  }
}

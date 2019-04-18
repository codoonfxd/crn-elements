/*
 * @Author: liuyz
 * @Date: 2019-04-17 17:28:47
 * @Last Modified by: liuyz
 * @Last Modified time: 2019-04-18 11:44:01
 */

import * as React from 'react'
import { TextInput, ViewStyle, TextInputProperties } from 'react-native'
import Color from 'color'
import { THEME_COLOR } from '../lib/constant'

interface IProps extends TextInputProperties {
  style?: ViewStyle
  onChangeText(text: string): any
}

export interface IState {
  text: string
}

export default class Input extends React.Component<IProps, IState> {
  inputRef: React.ReactNode
  constructor(props: IProps) {
    super(props)

    this.state = {
      text: '',
    }
  }

  textChange(text: string): void {
    this.setState({ text })
    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }
  }

  render() {
    const {
      placeholder = '请输入内容',
      selectionColor,
      style = {},
    } = this.props
    const color = Color(style.borderColor || THEME_COLOR)
    const borderColor = color.string()

    const { text } = this.state
    return (
      <TextInput
        ref={(el: React.ReactNode) => (this.inputRef = el)}
        placeholder={placeholder}
        selectionColor={selectionColor || THEME_COLOR} // 设置输入框高亮时的颜色（在iOS上还包括光标）
        underlineColorAndroid="transparent"
        // androidnumberOfLines={3} // 设置输入框的行数 当multiline设置为true时使用它
        {...this.props}
        style={{
          height: 36,
          paddingHorizontal: 8,
          borderColor,
          borderWidth: 1,
          borderRadius: 4,
          ...style,
        }}
        onChangeText={(value) => this.textChange(value)}
        value={text}
      />
    )
  }
}

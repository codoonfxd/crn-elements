/*
 * @Author: liuyz
 * @Date: 2019-04-17 17:28:47
 * @Last Modified by: liuyz
 * @Last Modified time: 2019-04-29 13:58:54
 */

import * as React from 'react'
import { TextInput, ViewStyle, TextInputProperties } from 'react-native'
import Color from 'color'
import { THEME_COLOR } from '../lib/constant'

interface IProps extends TextInputProperties {
  text?: string
  placeholder?: string
  style?: ViewStyle
  onChangeText(text: string): any
}

export default class Input extends React.Component<IProps> {
  inputRef: React.ReactNode
  constructor(props: IProps) {
    super(props)
  }

  textChange(text: string): void {
    if (this.props.onChangeText) {
      this.props.onChangeText(text)
    }
  }

  render() {
    const {
      text = '',
      placeholder = '请输入内容',
      selectionColor,
      style = {},
    } = this.props
    const color = Color(style.borderColor || THEME_COLOR)
    const borderColor = color.string()

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

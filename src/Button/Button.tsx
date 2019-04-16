/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-19 15:34:24
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-04-11 14:35:37
 * @Content: 按钮
 */
import * as React from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native'
import Color from 'color'
import { DEVICE_WIDTH, THEME_COLOR, DISABLE_COLOR } from '../lib/constant'
import { IS_IPHONE_X } from '../lib/device'

interface IProps {
  title: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  loading?: boolean
  /** 是否采用不填充的样式 */
  ghost?: boolean
  /** 添加IPhone X底部空间 */
  showBottomSpace?: boolean
  /** 按钮文字显示行数 */
  numberOfLines?: number
  onPress?(): any
}

export default class Button extends React.Component<IProps> {
  static defaultProps = {
    style: {},
    textStyle: {},
    disabled: false,
    loading: false,
    ghost: false,
    showBottomSpace: false,
    numberOfLines: 1,
  }

  render() {
    const {
      title,
      style = {},
      textStyle = {},
      onPress,
      disabled = false,
      loading = false,
      showBottomSpace = false,
      ghost = false,
      numberOfLines,
    } = this.props
    const color = Color(style.backgroundColor || THEME_COLOR)
    const darkenColor = color.darken(0.15).string()
    const backgroundColor = ghost
      ? '#ffffff'
      : disabled
      ? DISABLE_COLOR
      : loading
      ? darkenColor
      : color.string()
    const iphoneXBottomSpace = showBottomSpace && IS_IPHONE_X ? 24 : 0
    const colorString = color.string()
    const ghostColor = disabled ? DISABLE_COLOR : colorString
    const ghostStyle: ViewStyle = ghost
      ? {
          borderColor: ghostColor,
          borderWidth: 1,
          borderRadius: 3,
        }
      : {}
    const ghostTextStyle: TextStyle = ghost
      ? { color: ghostColor }
      : {
          color: textStyle.color || '#fff',
        }

    return (
      <TouchableHighlight
        style={{
          height: 50 + iphoneXBottomSpace,
          width: DEVICE_WIDTH,
          paddingLeft: 12,
          paddingRight: 12,
          ...ghostStyle,
          ...style,
          backgroundColor,
        }}
        underlayColor={
          ghost ? '#ffffff' : disabled ? DISABLE_COLOR : darkenColor
        }
        onPress={disabled || loading ? undefined : onPress}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
            paddingBottom: iphoneXBottomSpace,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              style={{ marginRight: 4 }}
              color={ghostTextStyle.color}
            />
          ) : null}
          <View style={{ justifyContent: 'center' }}>
            {typeof title === 'string' ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  ...textStyle,
                  ...ghostTextStyle,
                }}
                numberOfLines={numberOfLines}
              >
                {title}
              </Text>
            ) : (
              title
            )}
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

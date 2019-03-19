/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-19 15:34:24
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-03-19 16:52:26
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
  /** 添加IPhone X底部空间 */
  showBottomSpace?: boolean
  onPress?(): any
}

export default class Button extends React.Component<IProps> {
  static defaultProps = {
    style: {},
    textStyle: {},
    disabled: false,
    loading: false,
    showBottomSpace: false,
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
    } = this.props
    const color = Color(style.backgroundColor || THEME_COLOR)
    const backgroundColor = color.string()
    const darkenColor = color.darken(0.15).string()
    const iphoneXBottomSpace = showBottomSpace && IS_IPHONE_X ? 24 : 0
    return (
      <TouchableHighlight
        style={{
          height: 50 + iphoneXBottomSpace,
          width: DEVICE_WIDTH,
          flex: 1,
          ...style,
          backgroundColor: disabled
            ? DISABLE_COLOR
            : loading
            ? darkenColor
            : backgroundColor,
        }}
        underlayColor={disabled ? DISABLE_COLOR : darkenColor}
        onPress={disabled || loading ? undefined : onPress}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: iphoneXBottomSpace,
          }}
        >
          {loading ? (
            <ActivityIndicator
              size="small"
              style={{ marginRight: 4 }}
              color={textStyle.color || '#fff'}
            />
          ) : null}
          <View style={{ justifyContent: 'center' }}>
            {typeof title === 'string' ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#fff',
                  ...textStyle,
                }}
                numberOfLines={1}
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

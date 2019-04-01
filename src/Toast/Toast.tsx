/*
 * @Author: 沈经纬(shenjw@codoon.com)
 * @Date: 2019-03-31 12:00:21
 * @Last Modified by: 沈经纬(shenjw@codoon.com)
 * @Last Modified time: 2019-04-01 18:03:03
 * @Content: Toast notification
 */
import * as React from 'react'
import {
  Animated,
  Text,
  Easing,
  ViewStyle,
  EasingFunction,
  TextStyle,
  View,
} from 'react-native'
import { Omit } from 'lodash'

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../lib/constant'
import { toastStatic } from './ToastStatic'

export interface IToastConfig {
  /** duration time of the animation, the unit is millisecond */
  animateDuration?: number
  easing?: EasingFunction
}

export interface IToastProps {
  visible: boolean
  message: string
  style?: ViewStyle
  textStyle?: TextStyle
  /** duration time of the toast */
  duration?: number
  /** config of the animation */
  animateConfig?: IToastConfig
  /** has mask layer */
  hasMask?: boolean
  /** renderer around message text */
  renderTop?: React.ReactNode
  renderBottom?: React.ReactNode
  renderLeft?: React.ReactNode
  renderRight?: React.ReactNode
  /** callback after the toast fade away */
  onClose?(): any
}

export interface IToastState {
  opacity: Animated.Value
}

export const DEFAULT_DURATION = 0
export const DEFAULT_ANIMATE_DURATION = 300

export default class Toast extends React.Component<IToastProps, IToastState> {
  static defaultProps: Omit<IToastProps, 'visible' | 'message'> = {
    style: {},
    duration: DEFAULT_DURATION,
    animateConfig: {
      animateDuration: DEFAULT_ANIMATE_DURATION,
      easing: Easing.elastic(0.9),
    },
    onClose: () => {
      return null
    },
    hasMask: false,
  }
  static open = toastStatic.open
  static destroy = toastStatic.destroy
  static showLoading = toastStatic.showLoading
  static hideLoading = toastStatic.hideLoading

  cancelTask?: NodeJS.Timeout

  constructor(props: IToastProps) {
    super(props)

    this.state = {
      opacity: new Animated.Value(0),
    }
    // if visible is true, change the opacity state
    if (props.visible) {
      this.handleToastVisibleChange(true)
      this.handleVisibleUpdate()
    }
  }

  /**
   * change the animation of toast
   */
  handleToastVisibleChange = (visible: boolean) => {
    const { opacity } = this.state
    const { animateConfig = {}, onClose } = this.props
    const {
      animateDuration = DEFAULT_ANIMATE_DURATION,
      easing = Easing.elastic(0.9),
    } = animateConfig

    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: animateDuration,
      easing,
    }).start(visible ? undefined : onClose)
  }

  /**
   * handler of visible props changing
   */
  handleVisibleUpdate = () => {
    const { visible, duration } = this.props
    this.handleToastVisibleChange(visible)
    // duration is not the default value
    // toast will be closed after duration time
    if (duration && duration !== 0) {
      // clear the previous timer
      if (this.cancelTask) {
        clearTimeout(this.cancelTask)
      }
      // set asynchonous task to close toast
      this.cancelTask = setTimeout(() => {
        this.handleToastVisibleChange(false)
      }, duration)
    }
  }

  componentDidUpdate(prevProps: IToastProps) {
    const { visible } = this.props
    if (prevProps.visible !== visible) {
      this.handleVisibleUpdate()
    }
  }

  render() {
    const {
      message,
      style = Toast.defaultProps.style,
      textStyle = {},
      hasMask,
      renderLeft,
      renderRight,
      renderTop,
      renderBottom,
    } = this.props
    const { opacity } = this.state

    const paddingTopBottom = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 6],
    })
    const padding = opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    })
    return (
      <View style={{ position: 'absolute', top: 0, left: 0 }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: DEVICE_HEIGHT / 2 - 50,
            width: DEVICE_WIDTH,
            paddingLeft: DEVICE_WIDTH / 8,
            paddingRight: DEVICE_WIDTH / 8,
            flexDirection: 'row',
            justifyContent: 'center',
            zIndex: 99,
            opacity,
          }}
        >
          <Animated.View
            style={[
              {
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: 5,
                padding,
                paddingBottom: paddingTopBottom,
                paddingTop: paddingTopBottom,
              },
              style,
            ]}
          >
            {renderTop}
            <View style={{ flexDirection: 'row' }}>
              {renderLeft}
              <View
                style={{ justifyContent: 'center', flexGrow: 1, flexShrink: 0 }}
              >
                <Text
                  style={[
                    {
                      fontSize: 14,
                      color: '#fff',
                      textAlign: 'center',
                      lineHeight: 18,
                    },
                    textStyle,
                  ]}
                >
                  {message}
                </Text>
              </View>
              {renderRight}
            </View>
            {renderBottom}
          </Animated.View>
        </Animated.View>
        {hasMask ? (
          <View
            style={{
              width: DEVICE_WIDTH,
              // make sure to take over the whole screen, the height is multiplied with 2
              height: DEVICE_HEIGHT * 2,
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 9,
            }}
          />
        ) : null}
      </View>
    )
  }
}

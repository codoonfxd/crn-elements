/*
 * @Author: JaneEyre(lsy@codoon.com)
 * @Date: 2019-04-22 16:25:37
 * @Last Modified by: JaneEyre(lsy@codoon.com)
 * @Last Modified time: 2019-04-22 20:50:20
 * @Content: Modal
 */
import React from 'react'
import {
  View,
  Animated,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
  TextStyle,
  Easing,
  EasingFunction,
} from 'react-native'
import Button from '../Button'
import ModalStatic from './ModalStatic'

import { DEVICE_HEIGHT } from '../lib/constant'
import styles from './style'
import { Omit } from 'lodash'

export interface IModalProps {
  // whether show the modal
  visible: boolean
  // animate type
  animationType: 'none' | 'fade' | 'slide'
  // callback once the modal closed
  onClose: () => void
  // modal title
  title?: string
  // whether the background is transparent
  transparent?: boolean
  // whether mask closing is supported
  maskClosable?: boolean
  // modal animate duration
  animateDuration?: number
  // animate easing function
  animateEasing?: EasingFunction
  // the bottom button of the modal
  footButtons?: IModalFootItem[]
  // overall style of the modal
  wrapStyle?: ViewStyle
  // mask style of the modal
  maskStyle?: ViewStyle
  // body style of the modal
  style?: ViewStyle
  // foot button style
  footButtonStyle?: ViewStyle
}

export interface IModalFootItem {
  // button text
  text: string
  // press callback
  onPress?: () => void
  // button style
  style?: ViewStyle
  // button text style
  textStyle?: TextStyle
  // button underlayColor
  underlayColor?: string
}

interface IState {
  opacity: Animated.Value
  scale: Animated.Value
  visible: boolean
  position: Animated.Value
}

class Modal extends React.Component<IModalProps, IState> {
  static defaultProps: Omit<IModalProps, 'visible' | 'onClose'> = {
    title: '',
    style: {},
    wrapStyle: {},
    footButtonStyle: {},
    maskStyle: {},
    footButtons: [],
    transparent: true,
    maskClosable: true,
    animateDuration: 200,
    animateEasing: Easing.elastic(0.8),
    animationType: 'fade',
  }

  static alert = ModalStatic.alert
  static prompt = ModalStatic.prompt

  constructor(props: IModalProps) {
    super(props)
    const { visible } = props
    this.state = {
      visible,
      scale: new Animated.Value(this.getScale(visible)),
      opacity: new Animated.Value(this.getOpacity(visible)),
      position: new Animated.Value(this.getPosition(visible)),
    }
  }

  componentDidUpdate(prevProps: IModalProps) {
    if (prevProps.visible !== this.props.visible) {
      this.toggleShowModal(this.props.visible)
    }
  }

  /**
   * toggle the modal display or hide
   * @param { boolean } visible
   */
  toggleShowModal = (visible: boolean) => {
    if (visible) {
      this.setState({ visible })
    }
    this.animateModal(visible)
  }

  /**
   * the callback after clicking the mask
   */
  onMaskClose = () => {
    const { maskClosable, onClose } = this.props
    if (maskClosable) {
      onClose()
    }
  }

  /**
   * the callback after the bottom button of the modal is pressed
   * @param { object } foot
   */
  onFootButtonPress = async (foot: IModalFootItem) => {
    if (foot.onPress) {
      await foot.onPress()
    }
    this.props.onClose()
  }

  /**
   * get animate position value
   * @param { boolean } visible
   * @returns { number }
   */
  getPosition = (visible: boolean): number => {
    return visible ? 0 : DEVICE_HEIGHT
  }

  /**
   * get animate opacity value
   * @param { boolean } visible
   * @returns { number }
   */
  getOpacity = (visible: boolean): number => {
    return visible ? 1 : 0
  }

  /**
   * get animate scale value
   * @param { boolean } visible
   * @returns { number }
   */
  getScale = (visible: boolean): number => {
    return visible ? 1 : 1.06
  }

  /**
   * The method of making the modal move in a preset animation mode
   * @param { boolean } visible
   */
  animateModal = (visible: boolean): void => {
    const { animationType, animateEasing } = this.props
    let animateAction

    if (animationType === 'fade') {
      animateAction = Animated.parallel([
        Animated.timing(this.state.opacity, {
          toValue: this.getOpacity(visible),
          duration: this.props.animateDuration,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.scale, {
          toValue: this.getScale(visible),
          duration: this.props.animateDuration,
          useNativeDriver: true,
        }),
      ])
    } else if (animationType === 'slide') {
      animateAction = Animated.parallel([
        Animated.timing(this.state.opacity, {
          toValue: this.getOpacity(visible),
          duration: this.props.animateDuration,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.position, {
          useNativeDriver: true,
          easing: animateEasing,
          toValue: this.getPosition(visible),
          duration: this.props.animateDuration,
        }),
      ])
    } else {
      animateAction = Animated.timing(this.state.opacity, {
        useNativeDriver: true,
        toValue: this.getOpacity(visible),
        duration: this.props.animateDuration,
      })
    }
    animateAction.start(() => {
      if (!visible) {
        this.setState({ visible })
      }
    })
  }

  /**
   * method to render buttons at the bottom of the modal
   * @param { object } foot
   * @param { number } index
   * @param { number } total
   * @returns { JSX.Element }
   */
  renderFootButtonItem = (
    foot: IModalFootItem,
    index: number,
    total: number
  ) => {
    const isLastButton = index === total - 1
    const buttonStyle: object = isLastButton
      ? styles.footConfirmButton
      : styles.footCancelButton
    const textStyle: object = isLastButton
      ? styles.footConfirmText
      : styles.footCancelText

    return (
      <Button
        key={index}
        title={foot.text}
        underlayColor={foot.underlayColor}
        style={{ ...buttonStyle, ...foot.style } as ViewStyle}
        onPress={this.onFootButtonPress.bind(this, foot)}
        textStyle={{ ...textStyle, ...foot.textStyle } as ViewStyle}
      />
    )
  }

  render() {
    const { visible } = this.state
    const {
      style,
      title,
      maskStyle,
      wrapStyle,
      transparent,
      animationType,
      footButtons,
      footButtonStyle,
    } = this.props

    if (!visible) {
      return null
    }
    const opacity = animationType === 'none' ? 1 : this.state.opacity
    const total = footButtons ? footButtons.length : 0
    const animateMap = {
      none: {},
      fade: {
        transform: [{ scale: this.state.scale }],
        opacity: this.state.opacity,
      },
      slide: {
        transform: [{ translateY: this.state.position }],
      },
    }
    return (
      <View style={[styles.wrapper, styles.absolute, wrapStyle]}>
        <TouchableWithoutFeedback onPress={this.onMaskClose}>
          <Animated.View
            style={[
              styles.mask,
              styles.absolute,
              maskStyle,
              transparent ? null : styles.maskWhite,
              { opacity },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modalBody, style, animateMap[animationType]]}
        >
          {title ? (
            <View style={styles.modalTitleSection}>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
          ) : null}
          <View style={styles.modalContent}>{this.props.children}</View>
          <View style={[styles.footButtonContaier, footButtonStyle]}>
            {footButtons && footButtons.length
              ? footButtons.map((foot, index) => {
                  return this.renderFootButtonItem(foot, index, total)
                })
              : null}
          </View>
        </Animated.View>
      </View>
    )
  }
}

export default Modal

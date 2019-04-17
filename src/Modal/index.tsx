/*
 * @Author: JaneEyre(lsy@codoon.com)
 * @Date: 2019-04-17 10:56:00
 * @Last Modified by: JaneEyre(lsy@codoon.com)
 * @Last Modified time: 2019-04-17 10:56:00
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
} from 'react-native'
import Button from '../Button'

import { THEME_COLOR, DEVICE_HEIGHT } from '../lib/constant'
import styles from './style'

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
  // the bottom button of the modal
  footButtons?: IModalFootItem[]
  // overall style of the modal
  wrapStyle?: ViewStyle
  // mask style of the modal
  maskStyle?: ViewStyle
  // body style of the modal
  style?: ViewStyle
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
}

interface IState {
  opacity: Animated.Value
  scale: Animated.Value
  visible: boolean
  position: Animated.Value
}

class Modal extends React.Component<IModalProps> {
  static defaultProps: IModalProps = {
    visible: false,
    transparent: true,
    animationType: 'slide',
    // tslint:disable-next-line:no-empty
    onClose: () => {},
    title: '',
    maskClosable: true,
    animateDuration: 100,
    footButtons: [],
    wrapStyle: styles.wrapper as ViewStyle,
    maskStyle: styles.mask as ViewStyle,
    style: styles.modalBody as ViewStyle,
  }

  public state: IState = {
    visible: false,
    scale: new Animated.Value(0),
    opacity: new Animated.Value(0),
    position: new Animated.Value(DEVICE_HEIGHT),
  }

  componentDidUpdate(prevProps: IModalProps) {
    if (prevProps.visible !== this.props.visible) {
      this.toggleShowModal(this.props.visible)
    }
  }

  toggleShowModal = (visible: boolean) => {
    if (visible) {
      this.setState({ visible })
    }
    this.animateModal(visible)
  }

  getPosition = (visible: boolean): number => {
    return visible ? 0 : DEVICE_HEIGHT
  }

  getOpacity = (visible: boolean): number => {
    return visible ? 1 : 0
  }

  getScale = (visible: boolean): number => {
    return visible ? 1 : 0
  }

  animateModal = (visible: boolean): void => {
    const { animationType } = this.props
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
          easing: Easing.elastic(0.8),
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
   * @param: foot {object}
   */
  onFootButtonPress = async (foot: IModalFootItem) => {
    if (foot.onPress) {
      await foot.onPress()
    }
    this.props.onClose()
  }

  getFootButtonStyle = (
    foot: IModalFootItem,
    index: number,
    total: number
  ): ViewStyle => {
    const isFirstButton = index === 0
    const isLastButton = index === total - 1
    return {
      ...(styles.footButton as object),
      borderRightWidth: isLastButton ? 0 : 1,
      borderBottomLeftRadius: isFirstButton ? 5 : 0,
      borderBottomRightRadius: isLastButton ? 5 : 0,
      ...foot.style,
    } as ViewStyle
  }

  getFootChild = () => {
    const { footButtons } = this.props
    if (!(footButtons && footButtons.length)) {
      return null
    }
    return (
      <View style={styles.footButtonContaier}>
        {footButtons.map((foot, index) => {
          return (
            <Button
              title={foot.text}
              key={index}
              style={this.getFootButtonStyle(foot, index, footButtons.length)}
              onPress={this.onFootButtonPress.bind(this, foot)}
              underlayColor={'#e1fff3'}
              textStyle={{ color: THEME_COLOR, ...foot.textStyle }}
            />
          )
        })}
      </View>
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
    } = this.props

    if (!visible) {
      return null
    }

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
              {
                opacity: this.state.opacity,
              },
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
          {this.getFootChild()}
        </Animated.View>
      </View>
    )
  }
}

export default Modal

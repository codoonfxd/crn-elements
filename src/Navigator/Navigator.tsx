/*
 * @Author: JaneEyre(lsy@codoon.com)
 * @Date: 2019-04-23 11:19:22
 * @Last Modified by: JaneEyre(lsy@codoon.com)
 * @Last Modified time: 2019-04-24 11:38:58
 * @Content: Navigator
 */
import React, { ReactNode } from 'react'
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Animated,
} from 'react-native'

import styles from './style'
import { Omit } from 'lodash'

export interface INavigatorProps {
  // navigator title
  title: string
  // custom navigator style
  style?: ViewStyle
  // custom navigator title style
  titleStyle?: TextStyle
  // wether absolute positioning is supported
  absolute?: boolean
  // navigator left button config
  leftButton?: INavigatorButton
  // navigator right button config
  rightButton?: INavigatorButton
}

type IButtonChildren = ReactNode | React.Component

export interface INavigatorButton {
  // navigator button children
  children: IButtonChildren
  // the method after the navigator button is pressed
  onPress?: () => any
  // navigator button custom style
  style?: ViewStyle
  // navigator button press activeOpacity
  activeOpacity?: number
}

class Navigator extends React.Component<INavigatorProps> {
  static defaultProps: Omit<INavigatorProps, 'leftButton' | 'rightButton'> = {
    title: '',
    style: {},
    titleStyle: {},
    absolute: false,
  }

  /**
   * determine wthether the component is a react class component
   * @param { object } component
   * @returns { boolean }
   */
  isClassComponent = (component: IButtonChildren): boolean => {
    return Object.getPrototypeOf(component).name === 'Component'
  }

  /**
   * determine wthether the component is a react function component
   * @param { object } component
   * @returns { boolean }
   */
  isFunctionComponent = (component: IButtonChildren): boolean => {
    return typeof component === 'function' && React.isValidElement(component())
  }

  /**
   * get the button child component according to the child type
   * @param { object } button
   * @returns { object }
   */
  getButtonChild = (button: INavigatorButton): IButtonChildren => {
    if (React.isValidElement(button.children)) {
      return button.children
    } else if (
      this.isClassComponent(button.children) ||
      this.isFunctionComponent(button.children)
    ) {
      const Child = button.children as React.ComponentClass
      return <Child />
    } else {
      console.error(
        'button children is not a valid react node or react component..'
      )
      return null
    }
  }

  render() {
    const {
      title,
      style,
      leftButton,
      rightButton,
      titleStyle,
      absolute,
    } = this.props

    return (
      <Animated.View
        style={[styles.wrapper, absolute ? styles.absolute : null, style]}
      >
        {leftButton ? (
          <TouchableOpacity
            onPress={leftButton.onPress}
            style={[styles.leftButtonContainer, leftButton.style]}
            activeOpacity={leftButton.activeOpacity}
          >
            {this.getButtonChild(leftButton)}
          </TouchableOpacity>
        ) : (
          <View style={styles.leftButtonContainer} />
        )}

        <View style={styles.titleContainer}>
          <Animated.Text style={[styles.titleStyle, titleStyle]}>
            {title}
          </Animated.Text>
        </View>

        {rightButton ? (
          <TouchableOpacity
            onPress={rightButton.onPress}
            style={[styles.rightButtonContainer, rightButton.style]}
            activeOpacity={rightButton.activeOpacity}
          >
            {this.getButtonChild(rightButton)}
          </TouchableOpacity>
        ) : (
          <View style={styles.rightButtonContainer} />
        )}
      </Animated.View>
    )
  }
}

export default Navigator

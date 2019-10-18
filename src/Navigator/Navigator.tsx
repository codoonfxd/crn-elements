/*
 * @Author: JaneEyre(lsy@codoon.com)
 * @Date: 2019-04-23 11:19:22
 * @Last Modified by: JaneEyre(lsy@codoon.com)
 * @Last Modified time: 2019-06-12 13:47:28
 * @Content: Navigator
 */
import * as React from 'react'
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  Animated,
  Image,
} from 'react-native'

import styles from './style'
import { isClassComponent, isFunctionComponent } from '../lib/utils'
import { IS_IPHONE_X } from '../lib/device'

export type IButtonType = React.ReactNode | React.Component
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
  rightButtonStyle?: ViewStyle
  // right button
  rightButton?: IButtonType
  // navigator left button style
  leftButtonStyle?: ViewStyle
  // left button
  leftButton?: IButtonType
  // left button press callback
  onPress?: () => void
}

const ARROW_BACK =
  // tslint:disable-next-line: max-line-length
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAQAAAD/5HvMAAAB50lEQVRo3u3ZzSvEQRgHcGu9tCQuckIOchDlhrgpXOTC88x63U2L4iCFcNhyUQ4ObhK1LtqQkpLigBwk7RG5kCRFDuTdsktJnjm4+M5hvvsPfHpmfvM8MxsTY2NjY2NjY2Pzx4Qd3E+73GEIJ+jkGQpHfuw3gONP4IVPjhGkpmRe++bASa1pvPOTEyWh9pLKoNBvzgdoE8JpzuIjkfOq6gGcxjw+FTlPbgZwuIguRc6tuxKxd8roRuLQVUMxglNFdyLnTOUDOFTHT+JiHbqzEdVp41eRs+dJR3B6xaUK04Y3BfFljcgcXuxORIwXExrOVND5//08jgMazihgqboTeUnkvKlezHixLnKeVQukhfKsuFT3XIPhlGv2jhc08fCg3EIBX9ZXoxgQK3QHA6kSzdncCZuaeUoEPUKmwkh6XLSiGVTbQSRfPM9pFm4IdRWM5UkNaTzsQO2lMc2JFPDHoUjDGtJyjwt1KnXRm3wx9KWCSO5mehHrFFIZqKOylh7EKh035aCqVMG3Ium8oQDWUPhaJF1zKYpUyBdy26Vq1MLl0on82KAU6lzKpAN51mYCkTzpvC9WaQs2nPhSadugJ70oKYlWDXr0jM4CCTRvECeSoJOmDeJ83v1Vn0F/LdjY2NjY2NgYlneNdJiYTAB1AAAAAABJRU5ErkJggg=='

class Navigator extends React.Component<INavigatorProps> {
  static defaultProps: INavigatorProps = {
    title: '',
    style: {},
    titleStyle: {},
    absolute: false,
  }

  /**
   * get the button child component according to the child type
   * @param { object } button
   * @returns { object }
   */
  getButtonComponent = (button: IButtonType): IButtonType => {
    if (React.isValidElement(button)) {
      return button
    } else if (isClassComponent(button) || isFunctionComponent(button)) {
      const Child = button as React.ComponentClass
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
      titleStyle,
      absolute,
      rightButton,
      leftButton,
      leftButtonStyle,
      rightButtonStyle,
      onPress,
    } = this.props

    const defaultLeftButton = (
      <TouchableOpacity
        style={[styles.leftButtonContainer, leftButtonStyle]}
        onPress={onPress}
      >
        <Image source={{ uri: ARROW_BACK }} style={styles.arrowBack} />
      </TouchableOpacity>
    )

    return (
      <Animated.View
        style={[styles.wrapper, absolute ? styles.absolute : null, style]}
      >
        {absolute && IS_IPHONE_X && (
          <View
            style={{
              height: 30,
              backgroundColor: 'transparent',
            }}
          />
        )}
        <Animated.View style={[styles.innerWrapper, style]}>
          {leftButton ? (
            <View style={[styles.leftButtonContainer, leftButtonStyle]}>
              {this.getButtonComponent(leftButton)}
            </View>
          ) : (
            defaultLeftButton
          )}

          <View style={styles.titleContainer}>
            <Animated.Text style={[styles.titleStyle, titleStyle]}>
              {title}
            </Animated.Text>
          </View>

          <View style={[styles.rightButtonContainer, rightButtonStyle]}>
            {rightButton && this.getButtonComponent(rightButton)}
          </View>
        </Animated.View>
      </Animated.View>
    )
  }
}

export default Navigator

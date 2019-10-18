/*
 * @Author: JaneEyre(lsy@codoon.com)
 * @Date: 2019-04-22 16:05:29
 * @Last Modified by: JaneEyre(lsy@codoon.com)
 * @Last Modified time: 2019-04-22 21:07:21
 * @Content: Modal Alert Component
 */
import * as React from 'react'
import Modal, { IModalFootItem } from './Modal'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { Omit } from 'lodash'

export interface IModalAlertConf {
  title: string
  onClose?: () => any
  content?: string
  footButtons?: IModalFootItem[]
  animateDuration?: number
  contentStyle?: ViewStyle
}

interface IState {
  visible: boolean
}

const styles = StyleSheet.create({
  contentWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentStyle: {
    fontSize: 14,
    color: '#9a9a9a',
  },
})

class ModalAlert extends React.Component<IModalAlertConf> {
  static defaultProps: Omit<
    IModalAlertConf,
    'contentStyle' | 'animateDuration' | 'content'
  > = {
    title: '',
    onClose: () => {
      return null
    },
    footButtons: [],
  }

  public state: IState = {
    visible: false,
  }

  componentDidMount() {
    this.setState({ visible: true })
  }

  onClose = () => {
    this.setState({ visible: false })
    const { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }

  render() {
    const {
      title,
      content,
      footButtons,
      animateDuration,
      contentStyle,
    } = this.props
    const { visible } = this.state
    return (
      <Modal
        title={title}
        footButtons={footButtons}
        visible={visible}
        onClose={this.onClose}
        animationType="fade"
        animateDuration={animateDuration}
      >
        {content ? (
          <View style={styles.contentWrapper}>
            <Text style={[styles.contentStyle, contentStyle]}>{content}</Text>
          </View>
        ) : null}
      </Modal>
    )
  }
}

export default ModalAlert

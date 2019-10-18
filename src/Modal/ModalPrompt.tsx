/*
 * @Author: JaneEyre(lsy@codoon.com)
 * @Date: 2019-04-22 16:24:56
 * @Last Modified by: JaneEyre(lsy@codoon.com)
 * @Last Modified time: 2019-04-22 20:58:27
 * @Content: Modal Prompt Component
 */
import * as React from 'react'
import Modal, { IModalFootItem } from './Modal'
import { ViewStyle, View, Text, StyleSheet, TextInput } from 'react-native'
import { Omit } from 'lodash'

export interface IModalPromptConf {
  title: string
  value: string
  onValueChange: (value: string) => void
  onClose?: () => void
  content?: string
  footButtons?: IModalFootItem[]
  animateDuration?: number
  contentStyle?: ViewStyle
  placeholder?: string
  inputStyle?: ViewStyle
  autoFocus?: boolean
}

interface IState {
  value: string
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
  inputStyle: {
    borderWidth: 1,
    borderColor: '#f2f2f2',
    borderStyle: 'solid',
    borderRadius: 2,
    height: 40,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
})

class ModalPrompt extends React.Component<IModalPromptConf, IState> {
  static defaultProps: Omit<
    IModalPromptConf,
    | 'animateDuration'
    | 'inputStyle'
    | 'contentStyle'
    | 'value'
    | 'onValueChange'
  > = {
    title: '',
    content: '',
    footButtons: [],
    placeholder: '',
    autoFocus: true,
  }

  constructor(props: IModalPromptConf) {
    super(props)
    this.state = {
      visible: false,
      value: props.value,
    }
  }

  componentDidMount() {
    this.setState({ visible: true })
  }

  onValueChange = (value: string) => {
    this.setState({ value })
    this.props.onValueChange(value)
  }

  onClose = () => {
    this.setState({ visible: false })
    const { onClose } = this.props
    if (onClose) {
      onClose()
    }
  }

  render() {
    const { visible, value } = this.state
    const {
      title,
      footButtons,
      animateDuration,
      contentStyle,
      content,
      placeholder,
      inputStyle,
      autoFocus,
    } = this.props
    return (
      <Modal
        visible={visible}
        title={title}
        footButtons={footButtons}
        animationType="fade"
        onClose={this.onClose}
        animateDuration={animateDuration}
      >
        {content ? (
          <View style={styles.contentWrapper}>
            <Text style={[styles.contentStyle, contentStyle]}>{content}</Text>
          </View>
        ) : null}
        <TextInput
          placeholder={placeholder}
          style={[styles.inputStyle, inputStyle]}
          autoFocus={autoFocus}
          value={value}
          onChangeText={this.onValueChange}
        />
      </Modal>
    )
  }
}

export default ModalPrompt

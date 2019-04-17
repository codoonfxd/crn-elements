import React from 'react'
import { View, Text } from 'react-native'

import Modal, { IModalFootItem } from '../../src/Modal'
import Button from '../../src/Button'
import { DEVICE_WIDTH } from '../../src/lib/constant'

interface IState {
  visible: boolean
  visible2: boolean
}

class ModalScreen extends React.Component {
  public state: IState = {
    visible: false,
    visible2: false,
  }

  // 弹框底部按钮
  public footButtons: IModalFootItem[]

  constructor(props) {
    super(props)
    this.footButtons = [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('aaaa')
        },
      },
      {
        text: 'Ok',
        onPress: () => {
          console.log('bbbbb')
        },
      },
    ]
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  onPress = () => {
    this.setState({ visible: true })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="展示弹框(fade)"
          onPress={() => {
            this.setState({ visible: true })
          }}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Button
          title="展示弹框(slide)"
          onPress={() => {
            this.setState({ visible2: true })
          }}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Button
          title="展示弹框(none)"
          onPress={this.onPress}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Button
          title="展示弹框(transparent: false)"
          onPress={this.onPress}
          style={{ marginTop: 10, marginBottom: 10 }}
        />

        <Button
          title="弹框Alert"
          onPress={this.onPress}
          style={{ marginTop: 10, marginBottom: 10 }}
        />

        <Button
          title="弹框Prompt"
          onPress={this.onPress}
          style={{ marginTop: 10, marginBottom: 10 }}
        />

        <Modal
          visible={this.state.visible}
          title="弹窗title"
          transparent={true}
          animationType={'fade'}
          footButtons={this.footButtons}
          animateDuration={200}
          onClose={() => {
            this.setState({ visible: false })
          }}
        >
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <Text>modal content.....</Text>
            <Text>modal content.....</Text>
            <Text>modal content.....</Text>
            <Text>modal content.....</Text>
          </View>
        </Modal>

        <Modal
          visible={this.state.visible2}
          title="弹窗2title"
          transparent={true}
          animationType={'slide'}
          footButtons={this.footButtons}
          animateDuration={400}
          wrapStyle={{ justifyContent: 'flex-end' }}
          style={{ width: DEVICE_WIDTH, borderRadius: 0, height: 300 }}
          onClose={() => {
            this.setState({ visible2: false })
          }}
        >
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <Text>modal content.....</Text>
            <Text>modal content.....</Text>
            <Text>modal content.....</Text>
            <Text>modal content.....</Text>
          </View>
        </Modal>
      </View>
    )
  }
}

export default ModalScreen

import React from 'react'
import { View, Text, ViewStyle, Easing } from 'react-native'

import Modal from '../../src/Modal'
import Button from '../../src/Button'
import Portal from '../../src/Portal'
import { DEVICE_WIDTH } from '../../src/lib/constant'
import { IModalFootItem } from '../../src/Modal/Modal'

interface IState {
  visible: boolean
  visible2: boolean
  visible3: boolean
  visible4: boolean
  visible5: boolean
  value: string
}

class ModalScreen extends React.Component {
  public state: IState = {
    visible: false,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false,
    value: '',
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

  onAlertPress = () => {
    Modal.alert({
      title: 'alert title',
      content: 'alert content',
      footButtons: this.footButtons,
      contentStyle: {
        color: '#9a9a9a',
        fontSize: 12,
      } as ViewStyle,
    })
  }

  onModalPrompt = () => {
    Modal.prompt({
      value: this.state.value,
      onValueChange: (value: string) => {
        this.setState({ value })
      },
      title: 'title',
      content: 'content',
      footButtons: this.footButtons,
      placeholder: 'placeholder',
    })
  }

  render() {
    return (
      <Portal>
        <View style={{ flex: 1 }}>
          <Button
            title="animateType: fade"
            onPress={() => {
              this.setState({ visible: true })
            }}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
          <Button
            title="animateType: slide"
            onPress={() => {
              this.setState({ visible2: true })
            }}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
          <Button
            title="animateType: none"
            onPress={() => {
              this.setState({ visible4: true })
            }}
            style={{ marginTop: 10, marginBottom: 10 }}
          />
          <Button
            title="transparent: false"
            onPress={() => {
              this.setState({ visible3: true })
            }}
            style={{ marginTop: 10, marginBottom: 10 }}
          />

          <Button
            title="Modal.alert"
            onPress={this.onAlertPress}
            style={{ marginTop: 10, marginBottom: 10 }}
          />

          <Button
            title="Modal.prompt"
            onPress={this.onModalPrompt}
            style={{ marginTop: 10, marginBottom: 10 }}
          />

          <Button
            title="Custom Modal FootButton"
            onPress={() => {
              this.setState({ visible5: true })
            }}
            style={{ marginTop: 10, marginBottom: 10 }}
          />

          <Modal
            visible={this.state.visible}
            title="弹窗title"
            transparent={true}
            animationType={'fade'}
            footButtons={this.footButtons}
            animateDuration={300}
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
            visible={this.state.visible4}
            title="弹窗3title"
            transparent={true}
            animationType={'none'}
            footButtons={this.footButtons}
            animateDuration={200}
            onClose={() => {
              this.setState({ visible4: false })
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

          <Modal
            visible={this.state.visible3}
            transparent={false}
            animationType={'slide'}
            animateDuration={400}
            style={{
              width: DEVICE_WIDTH,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClose={() => {
              this.setState({ visible3: false })
            }}
          >
            <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
              <Text>modal content.....</Text>
              <Text>modal content.....</Text>
              <Text>modal content.....</Text>
              <Text>modal content.....</Text>
              <Button
                title="隐藏背景不透明弹框"
                style={{ marginTop: 10, borderRadius: 2 }}
                onPress={() => {
                  this.setState({ visible3: false })
                }}
              />
            </View>
          </Modal>

          <Modal
            visible={this.state.visible5}
            title="弹窗title"
            transparent={true}
            animationType={'fade'}
            style={{ width: 300 }}
            footButtonStyle={{
              borderColor: '#f2f2f2',
              borderTopWidth: 1,
              borderStyle: 'solid',
              borderRadius: 5,
              overflow: 'hidden',
              paddingVertical: 0,
              paddingHorizontal: 0,
            }}
            footButtons={[
              {
                text: '取消',
                underlayColor: '#e1fff3',
                style: {
                  borderWidth: 0,
                  borderRightWidth: 1,
                  backgroundColor: '#fff',
                  borderRadius: 0,
                  marginRight: 0,
                },
                textStyle: {
                  color: '#00bc71',
                },
              },
              {
                text: '确认',
                underlayColor: '#e1fff3',
                style: {
                  marginLeft: 0,
                  borderWidth: 0,
                  backgroundColor: '#fff',
                  borderRadius: 0,
                },
                textStyle: {
                  color: '#00bc71',
                },
              },
            ]}
            animateDuration={300}
            onClose={() => {
              this.setState({ visible5: false })
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
      </Portal>
    )
  }
}

export default ModalScreen

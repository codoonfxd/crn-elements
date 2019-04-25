/*
 * @Author: liuyz
 * @Date: 2019-04-18 14:42:43
 * @Last Modified by: liuyz
 * @Last Modified time: 2019-04-22 17:02:04
 */

import * as React from 'react'
import { View, ViewStyle, Platform, StyleSheet, PickerIOS } from 'react-native'

import PickerAndroid from './PickerAndroid'

const Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid
// const Picker = PickerIOS
const PickerItem = Picker.Item

interface IProps {
  itemStyle?: ViewStyle

  pickerData: [any]
  selectedValue: any
  onValueChange(value: object, index: number): any
}

interface IState {
  pickerData: [any]
  selectedValue: any
}

export default class PickerView extends React.Component<IProps, IState> {
  pickedValue: [object | number]

  constructor(props: IProps) {
    super(props)

    this.state = this.getStateFromProps(this.props)
    this.pickedValue = JSON.parse(JSON.stringify(props.selectedValue))
  }

  componentWillReceiveProps(newProps: IProps) {
    const newState = this.getStateFromProps(newProps)
    this.setState(newState)
  }

  getStateFromProps(props: IProps) {
    let { pickerData, selectedValue } = props

    if (selectedValue.constructor !== Array) {
      selectedValue = [selectedValue]
    }
    if (pickerData[0].constructor !== Array) {
      pickerData = [pickerData]
    }
    return {
      ...props,
      pickerData,
      selectedValue,
    }
  }

  renderPicker() {
    const { pickerData } = this.state
    return pickerData.map((item: [], index: number) => {
      return (
        <View style={styles.pickerWheel} key={index}>
          <Picker
            itemStyle={{
              fontSize: 25,
              textAlign: 'center',
              fontWeight: 'bold',
              ...this.props.itemStyle,
            }}
            selectedValue={this.state.selectedValue[index]}
            onValueChange={(value: any) => {
              this.pickedValue.splice(index, 1, value)
              this.setState({
                selectedValue: JSON.parse(JSON.stringify(this.pickedValue)),
              })
              this.props.onValueChange(
                JSON.parse(JSON.stringify(this.pickedValue)),
                index
              )
            }}
          >
            {item.map((value: string, key: number) => (
              <PickerItem key={key} value={value} label={value.toString()} />
            ))}
          </Picker>
        </View>
      )
    })
  }

  render() {
    return <View style={{ flexDirection: 'row' }}>{this.renderPicker()}</View>
  }
}

const styles = StyleSheet.create({
  pickerWheel: {
    flex: 1,
  },
})

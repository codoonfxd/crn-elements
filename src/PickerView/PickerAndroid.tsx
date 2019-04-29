/*
 * @Author: liuyz
 * @Date: 2019-04-29 11:00:31
 * @Last Modified by: liuyz
 * @Last Modified time: 2019-04-29 11:00:59
 */
import * as React from 'react'
import {
  Text,
  View,
  ViewStyle,
  TextStyle,
  StyleSheet,
  PanResponder,
  GestureResponderEvent,
  PixelRatio,
} from 'react-native'

import PickerAndroidItem from './PickerAndroidItem'

import { DEVICE_WIDTH as width } from '../lib/constant'

const ratio = PixelRatio.get()

interface IProps {
  children: any
  pickerStyle?: ViewStyle
  itemStyle?: TextStyle
  selectedValue: any
  onValueChange(value: object, index: number): any
}

interface IState {
  selectedIndex: number
  pickerData: any[]
  onValueChange(value: object, index: number): any
}

export default class PickerAndroid extends React.Component<IProps, IState> {
  static Item = PickerAndroidItem

  _panResponder: any
  index: number
  middleHeight: number
  up: any
  middle: any
  down: any
  isMoving: boolean

  constructor(props: IProps) {
    super(props)

    this.state = this.getStateFromProps(props)
    this._panResponder = null
    this.index = 0
    this.middleHeight = 0
    this.up = null
    this.middle = null
    this.down = null

    this.isMoving = false
    // this.pickedValue = JSON.parse(JSON.stringify(props.selectedValue))
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderRelease: this._handlePanResponderRelease.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
    })
    this.isMoving = false
    this.index = this.state.selectedIndex
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState(this.getStateFromProps(nextProps))
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState, context: any) {
    return (
      JSON.stringify([
        {
          selectedIndex: nextState.selectedIndex,
          pickerData: nextState.pickerData,
          onValueChange: nextState.onValueChange,
        },
        context,
      ]) !==
      JSON.stringify([
        {
          selectedIndex: this.state.selectedIndex,
          pickerData: this.state.pickerData,
          onValueChange: this.state.onValueChange,
        },
        this.context,
      ])
    )
  }

  getStateFromProps(props: IProps) {
    let selectedIndex = 0
    const pickerData: any[] = []
    const onValueChange = props.onValueChange
    React.Children.forEach(props.children, (child: any, index) => {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index
      }
      pickerData.push({ value: child.props.value, label: child.props.label })
    })
    // fix issue#https://github.com/beefe/react-native-picker/issues/51
    this.index = selectedIndex
    return {
      selectedIndex,
      pickerData,
      onValueChange,
    }
  }

  _move(dy: number) {
    const index = this.index
    this.middleHeight = Math.abs(-index * 38 + dy)
    if (this.up) {
      this.up.setNativeProps({
        style: {
          marginTop: (3 - index) * 30 + dy * 0.75,
        },
      })
    }
    if (this.middle) {
      this.middle.setNativeProps({
        style: {
          marginTop: -index * 38 + dy,
        },
      })
    }
    if (this.down) {
      this.down.setNativeProps({
        style: {
          marginTop: (-index - 1) * 30 + dy * 0.75,
        },
      })
    }
  }

  _moveTo(index: number) {
    const _index = this.index
    const diff = _index - index
    let marginValue
    if (diff && !this.isMoving) {
      marginValue = diff * 38
      this._move(marginValue)
      this.index = index
      this._onValueChange()
    }
  }

  moveTo(index: number) {
    this._moveTo(index)
  }

  moveUp() {
    this._moveTo(Math.max(this.state.pickerData.length - 1, 0))
  }

  moveDown() {
    this._moveTo(Math.min(this.index + 1, this.state.pickerData.length - 1))
  }

  _handlePanResponderMove(evt: GestureResponderEvent, gestureState: any) {
    const dy = gestureState.dy
    if (this.isMoving) {
      return
    }
    // turn down
    if (dy > 0) {
      this._move(dy > this.index * 38 ? this.index * 38 : dy)
    } else {
      this._move(
        dy < (this.index - this.state.pickerData.length + 1) * 38
          ? (this.index - this.state.pickerData.length + 1) * 38
          : dy
      )
    }
  }

  _handlePanResponderRelease(evt: GestureResponderEvent, gestureState: any) {
    const middleHeight = this.middleHeight
    this.index =
      middleHeight % 38 >= 20
        ? Math.ceil(middleHeight / 38)
        : Math.floor(middleHeight / 38)
    this._move(0)
    this._onValueChange()
  }

  _onValueChange() {
    // the current picked label was more expected to be passed,
    // but PickerIOS only passed value, so we set label to be the second argument
    // add by zooble @2015-12-10
    const curItem = this.state.pickerData[this.index]
    if (this.state.onValueChange) {
      this.state.onValueChange(curItem.value, curItem.label)
    }
  }

  _renderItems(items: any[]) {
    // value was used to watch the change of picker
    // label was used to display
    const upItems: any[] = []
    const middleItems: any[] = []
    const downItems: any[] = []
    items.forEach((item: any, index) => {
      upItems[index] = (
        <Text
          key={'up' + index}
          style={[styles.upText, this.props.itemStyle]}
          onPress={() => {
            this._moveTo(index)
          }}
        >
          {item.label}
        </Text>
      )

      middleItems[index] = (
        <Text
          key={'mid' + index}
          style={[styles.middleText, this.props.itemStyle]}
        >
          {item.label}
        </Text>
      )

      downItems[index] = (
        <Text
          key={'down' + index}
          style={[styles.downText, this.props.itemStyle]}
          onPress={() => {
            this._moveTo(index)
          }}
        >
          {item.label}
        </Text>
      )
    })
    return { upItems, middleItems, downItems }
  }

  render() {
    const index = this.state.selectedIndex
    const length = this.state.pickerData.length
    const items = this._renderItems(this.state.pickerData)

    const upViewStyle = {
      marginTop: (3 - index) * 30,
      height: length * 30,
    }
    const middleViewStyle = {
      marginTop: -index * 38,
    }
    const downViewStyle = {
      marginTop: (-index - 1) * 30,
      height: length * 30,
    }

    return (
      // total to be 90*2+38=220 height
      <View
        style={[styles.container, this.props.pickerStyle]}
        {...this._panResponder.panHandlers}
      >
        <View style={styles.up}>
          <View
            style={[styles.upView, upViewStyle]}
            ref={(up) => {
              this.up = up
            }}
          >
            {items.upItems}
          </View>
        </View>

        <View style={styles.middle}>
          <View
            style={[styles.middleView, middleViewStyle]}
            ref={(middle) => {
              this.middle = middle
            }}
          >
            {items.middleItems}
          </View>
        </View>

        <View style={styles.down}>
          <View
            style={[styles.downView, downViewStyle]}
            ref={(down) => {
              this.down = down
            }}
          >
            {items.downItems}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // this is very important
    // backgroundColor: null
  },
  up: {
    height: 90,
    overflow: 'hidden',
  },
  upView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  upText: {
    paddingTop: 0,
    height: 30,
    fontSize: 20,
    color: '#000',
    opacity: 0.5,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  middle: {
    height: 38,
    width,
    overflow: 'hidden',
    borderColor: '#aaa',
    borderTopWidth: 1 / ratio,
    borderBottomWidth: 1 / ratio,
  },
  middleView: {
    height: 38,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  middleText: {
    alignSelf: 'center',
    height: 38,
    color: '#000',
    fontSize: 24,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  down: {
    height: 90,
    overflow: 'hidden',
  },
  downView: {
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  downText: {
    paddingTop: 0,
    height: 30,
    fontSize: 16,
    color: '#000',
    opacity: 0.5,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
  },
})

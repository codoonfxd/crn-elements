import * as React from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  ViewStyle,
  TextStyle,
} from 'react-native'

interface IProps {
  title: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  onPress?(): any
}

export default class Button extends React.Component<IProps> {
  render() {
    const { children, style, textStyle, onPress = () => {} } = this.props
    return (
      <TouchableHighlight
        style={{
          height: 50,
          width: 100,
          backgroundColor: '#00c476',
          ...style,
        }}
        underlayColor="#00a153"
        onPress={onPress}
      >
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              color: '#fff',
              ...textStyle,
            }}
          >
            {children}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

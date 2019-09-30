import React from 'react';
import { View, Alert } from 'react-native';
import { Input } from '../../src';

class InputScreen extends React.Component {

  focusNextField = (nextField) => {
    this.refs[nextField].inputRef.focus();
  };

  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ height: 16 }} />
        <Input ref="0" placeholder="第一个有边框输入框"
          text={'第一个输入框的值'}
          onSubmitEditing={() => this.focusNextField('1')}
        />
        <View style={{ height: 16 }} />
        <Input ref="1" placeholder="第二个无边框框" style={{borderColor: '#ffffff'}}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <View style={{ height: 16 }} />
        <Input ref="2" placeholder="第三个输入框"
        onChangeText={val => {Alert.alert(val)}}
        style={{
          borderColor: '#dddddd',
          textAlign: 'right',
          textAlignVertical: 'center',
        }}/>
        <View style={{ height: 16 }} />
        <Input ref="3" placeholder="第四个TextInput输入框"
        multiline={true}
        style={{
          height: 60,
          fontSize: 16,
          padding: 4,
          marginBottom: 10,
          borderColor: '#dddddd',
        }}/>
      </View>
    );
  }
}

export default InputScreen;

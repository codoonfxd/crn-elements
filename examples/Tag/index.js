import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {Tag} from '../../src';

export default class TagScreen extends Component {
  onClose = () => {
    console.log('点击了关闭按钮!')
  }
  onPress = () => {
    console.log('点击了按钮按钮!')
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <View style={styles.item}>
          <Tag title="ccb" wraperStyle={{height:40}}/>
        </View>
        <View style={styles.item}>
          <Tag title="ccb" border={false} showClose={false} type='round'/>
        </View>
        <View style={styles.item}>
          <Tag title="ccb" border={{borderColor: 'red'}} onClose={this.onClose} onPress={this.onPress}/>
        </View>
      </View>
    );
  }
}
const styles = {
    item:{
        flexDirection:'row',
        marginBottom:10,
    }
}

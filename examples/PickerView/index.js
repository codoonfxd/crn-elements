import React from 'react';
import { View } from 'react-native';
import { PickerView } from '../../src';

class PickerViewScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      pickerData1: [1,2,3,4],
      pickerData2: [
        [1,2,3,4],
        [5,6,7,8],
      ]
    }
  }

  onValueChange(pick,index) {
    console.log(pick,index)
  }

  render() {
    const {pickerData1, pickerData2} = this.state
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 16 }} />
        <PickerView
          itemStyle={{color: 'red'}}
          pickerData={pickerData1}
          selectedValue={[1]}
          onValueChange={(pick,index) => this.onValueChange(pick,index)} />
        <View style={{ height: 16 }} />
        <PickerView
          pickerData={pickerData2}
          selectedValue={[1, 5]}
          onValueChange={(pick,index) => this.onValueChange(pick,index)} />
      </View>
    );
  }
}

export default PickerViewScreen;

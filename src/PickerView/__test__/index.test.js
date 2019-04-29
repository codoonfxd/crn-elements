import * as React from 'react';
import { PickerIOS, Platform } from 'react-native'
import { shallow } from 'enzyme';
import sinon from 'sinon';
import PickerView from '../PickerView';
const Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid
const PickerItem = Picker.Item

describe('<PickerView />', () => {
  it('renders three <PickerView /> components', () => {
    const onValueChange = sinon.spy();
    const wrapper = shallow(<PickerView pickerData={[1,2,3,4]} selectedValue={[3]} onValueChange={onValueChange} />);
    expect(wrapper.find(PickerItem).length).toBe(4);
  });
});

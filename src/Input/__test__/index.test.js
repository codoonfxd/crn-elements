import * as React from 'react';
import { shallow } from 'enzyme';
import Input from '../Input';

describe('<Input />', () => {
  it('renders three <Input /> components', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.find(<div/>).length).toBe(0);
  });
});

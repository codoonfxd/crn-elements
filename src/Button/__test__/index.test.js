import * as React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from '../Button';
import { ActivityIndicator } from 'react-native';

describe('<Button />', () => {
  it('渲染快照', () => {
    const tree = renderer.create(<Button title="按钮" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('props: loading正常渲染', () => {
    const wrapper = shallow(<Button title="Loading" loading />);
    expect(wrapper.find(ActivityIndicator).length).toBe(1);
  });
});

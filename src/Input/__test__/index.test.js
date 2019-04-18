import * as React from 'react';
import renderer from 'react-test-renderer';
import Input from '../Input';

describe('<Input />', () => {
  it('渲染快照', () => {
    const tree = renderer.create(<Input placeholder="输入框" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import * as React from 'react';
import renderer from 'react-test-renderer';
import PickerView from '../PickerView';

describe('<PickerView />', () => {
  it('渲染快照', () => {
    const tree = renderer.create(<PickerView title="按钮" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

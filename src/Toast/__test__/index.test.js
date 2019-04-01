import * as React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import { omit, mapKeys } from 'lodash';
import Toast from '../Toast';
import Portal from '../../Portal';

describe('<Toast />', () => {
  it('"open" and "destroy" works ', done => {
    const wrapper = shallow(<Portal />);
    Toast.open({
      message: 'open',
    });
    expect(wrapper.find(Toast).length).toBe(1);
    Toast.destroy();
    setTimeout(() => {
      expect(wrapper.find(Toast).length).toBe(0);
      done();
    }, 300);
  });

  it(`"showLoading" and "hideLoading" works`, done => {
    const wrapper = shallow(<Portal />);
    Toast.showLoading();
    const toast = wrapper.find(Toast);
    expect(toast.length).toBe(1);
    expect(toast.prop('message')).toBe('加载中');
    Toast.hideLoading();
    setTimeout(() => {
      expect(wrapper.find(Toast).length).toBe(0);
      done();
    }, 300);
  });

  it(`deliver props successfully`, done => {
    const wrapper = shallow(<Portal />);
    const duration = 300;
    const animateDuration = 200;
    const config = {
      message: 'deliver props',
      duration,
      style: {},
      textStyle: {},
      renderTop: <View />,
      renderBottom: <View />,
      renderLeft: <View />,
      renderRight: <View />,
      onClose: () => {},
      animateConfig: {
        animateDuration,
      },
    };
    Toast.open(config);
    const toast = wrapper.find(Toast);
    const props = toast.props();
    mapKeys(omit(config, ['duration', 'onClose']), (value, key) => {
      expect(props[key]).toBe(value);
    });
    expect(props.duration).toBe(0);
    setTimeout(() => {
      expect(wrapper.find(Toast).length).toBe(0);
      done();
    }, duration + animateDuration + 100);
  });
});

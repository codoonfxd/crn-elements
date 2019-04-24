import React from "react";
import { View, Text } from "react-native";

import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Navigator from "../Navigator";

describe("<Navigator />", () => {
  it("snapshot", () => {
    const tree = renderer.create(<Navigator title="title" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render title when the title prop is passed", () => {
    const title = "title";
    const wrapper = shallow(<Navigator title={title} />);
    expect(wrapper.contains(title)).toBe(true);
  });

  it("should render left button correctly when the leftbutton child as a react element is passed", () => {
    const leftButtonChild = (
      <View>
        <Text>leftButton</Text>
      </View>
    );
    const leftbutton = {
      children: leftButtonChild
    };
    const wrapper = shallow(<Navigator leftButton={leftbutton} />);
    expect(wrapper.contains(leftButtonChild)).toBe(true);
  });

  it("should render left button correctly when the leftbutton child as a react class component is passed", () => {
    class leftButtonComp extends React.Component {
      render() {
        return <Text>xxx</Text>;
      }
    }
    const leftbutton = {
      children: leftButtonComp
    };
    const wrapper = shallow(<Navigator leftButton={leftbutton} />);
    expect(wrapper.find(leftButtonComp)).toHaveLength(1);
  });

  it("should render left button correctly when the leftbutton child as a react function component is passed", () => {
    const leftButtonComp = () => (
      <Text>xxx</Text>
    )
    const leftbutton = {
      children: leftButtonComp
    };
    const wrapper = shallow(<Navigator leftButton={leftbutton} />);
    expect(wrapper.find(leftButtonComp)).toHaveLength(1);
  });

  it("should render right button correctly when the rightbutton child is passed", () => {
    const rightButtonChild = (
      <View>
        <Text>rightButton</Text>
      </View>
    );
    const rightButton = {
      children: rightButtonChild
    };
    const wrapper = shallow(<Navigator rightButton={rightButton} />);
    expect(wrapper.contains(rightButtonChild)).toBe(true);
  });

  it("should trigger press callback when the leftbutton onpress is passed", () => {
    const leftButtonChild = (
      <View>
        <Text>leftButton</Text>
      </View>
    );
    const pressFn = jest.fn();
    pressFn.mockReturnValue(true);
    const leftbutton = {
      children: leftButtonChild,
      onPress: pressFn
    };
    const wrapper = shallow(<Navigator leftButton={leftbutton} />);
    wrapper
      .children()
      .first()
      .props()
      .onPress();
    expect(pressFn.mock.calls.length).toBe(1);
  });

  it("should trigger press callback when the rightbutton onpress is passed", () => {
    const rightButtonChild = (
      <View>
        <Text>leftButton</Text>
      </View>
    );
    const pressFn = jest.fn();
    pressFn.mockReturnValue(true);
    const rightButton = {
      children: rightButtonChild,
      onPress: pressFn
    };
    const wrapper = shallow(<Navigator rightButton={rightButton} />);
    wrapper
      .children()
      .last()
      .props()
      .onPress();
    expect(pressFn.mock.calls.length).toBe(1);
  });
});

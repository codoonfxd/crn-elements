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

  it("should render left button correctly when the leftbutton as a react element is passed", () => {
    const leftButton = (
      <View>
        <Text>leftButton</Text>
      </View>
    )
    const wrapper = shallow(<Navigator leftButton={leftButton} />);
    expect(wrapper.contains(leftButtonChild)).toBe(true);
  });

  it("should render left button correctly when the leftbutton as a react class component is passed", () => {
    class leftButtonComp extends React.Component {
      render() {
        return <Text>xxx</Text>;
      }
    }
    const wrapper = shallow(<Navigator leftButton={leftButtonComp} />);
    expect(wrapper.find(leftButtonComp)).toHaveLength(1);
  });

  it("should render left button correctly when the leftbutton as a react function component is passed", () => {
    const leftButtonComp = () => (
      <Text>xxx</Text>
    )
    const wrapper = shallow(<Navigator leftButton={leftButtonComp} />);
    expect(wrapper.find(leftButtonComp)).toHaveLength(1);
  });

  it("should render right button correctly when the rightbutton is passed", () => {
    const rightButtonChild = (
      <View>
        <Text>rightButton</Text>
      </View>
    );
    const wrapper = shallow(<Navigator rightButton={rightButtonChild} />);
    expect(wrapper.contains(rightButtonChild)).toBe(true);
  });
});

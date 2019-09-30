import React from "react";
import { shallow } from 'enzyme'
import renderer from "react-test-renderer";
import Modal from "../Modal";

describe("<Modal />", () => {
  it("snapshot", () => {
    const tree = renderer.create(<Modal />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("render title correctly when the title prop is passed", () => {
    const title = 'test title'
    const wrapper = shallow(<Modal title={title} visible={true} />)
    // expect(wrapper.find(''))
  })  
});

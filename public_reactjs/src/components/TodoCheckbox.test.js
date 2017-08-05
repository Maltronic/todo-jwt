import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPanel from "./LoginPanel";
import TodoCheckbox from "./TodoCheckbox";

describe('TodoCheckbox renders correctly', () => {
    let props = {
        todo: {
            __v: 0,
            _id: "5814eaee84f3bf7ff597e16f",
            createdAt: "2016-10-29T18:31:10.075Z",

            done: true,
            priority: 0,
            text: "test"
        },
        toggleCallback: null
};

    beforeEach(() => {
        props.toggleCallback = jest.fn();
    });

    it('Matches Snapshot', () => {
        const wrapper = shallow(
            <TodoCheckbox {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it("Can be submitted", () => {
        const wrapper = mount(<TodoCheckbox {...props} />);
        wrapper.simulate('change');
        expect(props.toggleCallback).toHaveBeenCalledTimes(1);
    });
});


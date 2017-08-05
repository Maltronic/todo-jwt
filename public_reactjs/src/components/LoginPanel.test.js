import React from 'react';
import { shallow, mount } from 'enzyme';
import LoginPanel from "./LoginPanel";

describe('LoginPanel renders correctly', () => {
    let props = {
        completedPhrase: null,
        onSelected: null,
        submitCallback: null,
        title: "Login:"
    };

    beforeEach(() => {
        props.onSelected = jest.fn();
        props.submitCallback = jest.fn();
    });

    it('Matches Snapshot', () => {
        const wrapper = shallow(
            <LoginPanel {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it("Can be submitted", () => {
        const wrapper = mount(<LoginPanel {...props} />);
        wrapper.find('[type="submit"]').get(0).click();
        expect(props.submitCallback).toHaveBeenCalledTimes(1);
    });
});


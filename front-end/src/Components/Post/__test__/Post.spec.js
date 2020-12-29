import React from'react';
import Post from '../Post'
import { shallow, mount } from 'enzyme'
import Title from '../../Title/Title'

describe('Post', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Post />));

    it('Should render Correctly', () => expect(wrapper).toMatchSnapshot());

    it('Should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(6)
    })

    it('should render Title components', () => {
        expect(wrapper.containsAllMatchingElements([
            <Title />
        ])).toEqual(true)
    });


});

describe('mounted posts', () => {
    let wrapper;

    beforeEach(() => wrapper = mount(<Post />));

    it('generates random thought', () => {
        const spy = jest.spyOn(wrapper.instance(), 'randomThought');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0)
        wrapper.find('.gen-btn').first().simulate('click');
        expect(spy).toHaveBeenCalledTimes(1);
    })
    it('submits thought and opinion on submit', () => {
        const spy = jest.spyOn(wrapper.instance(), 'submit');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0)
        wrapper.find('.form-area').first().simulate('submit');
        expect(spy).toHaveBeenCalledTimes(1);
    })
})

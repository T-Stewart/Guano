import React from 'react';
import { shallow, mount } from 'enzyme';
import UserLogin from '../UserLogin'
import Title from '../../Title/Title'

describe('UserLogin', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<UserLogin />));
    it('Should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('should render the Title component correctly', () => {
    expect(wrapper.containsAllMatchingElements([<Title />])).toEqual(true)
    })

    it('should render a <Div />', () => {
        expect(wrapper.find('div').length).toEqual(6)
    })

})

describe('mountedUserLogin', () => {
    let wrapper;

    beforeEach(() => wrapper = mount(<UserLogin />));
    
    it('calls onSubmit when submit button is clicked', () => {
        const spy = jest.spyOn(wrapper.instance(), 'onSubmit');
        wrapper.instance().forceUpdate();
        expect(spy).toHaveBeenCalledTimes(0);
        wrapper.find('.login-btn').first().simulate('submit');
        expect(spy).toHaveBeenCalledTimes(1);
    })
})

import React from 'react';
import Title from '../Title'
import { shallow } from 'enzyme'


describe('Title', () => {
    let wrapper;

    beforeEach(() => wrapper = shallow(<Title />));

    it('Should render correctly', () => expect(wrapper).toMatchSnapshot());

    it('Should render a <div />', () => {
        expect(wrapper.find('div').length).toEqual(1);
    })
     it('Should render a <h1 />', () => {
        expect(wrapper.find('h1').length).toEqual(1);
    })
     it('Should render a <h2 />', () => {
        expect(wrapper.find('h2').length).toEqual(1);
    })
     it('Should render a <h4 />', () => {
        expect(wrapper.find('h4').length).toEqual(1);
    })

})
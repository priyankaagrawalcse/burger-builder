import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter : new Adapter()});

describe('<NavigationItems />' , () => {
    let wrapper ;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <NavigationItem /> elements if not authenticated' , () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('should render 3 <NavigationItem /> elements if authenticated' , () => {
        wrapper.setProps({isAuthenticated : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
    it('should have 1 logout navigation element if authenticated' , () => {
        wrapper.setProps({isAuthenticated : true})
        expect(wrapper.contains(<NavigationItem link="/logout">LogOut</NavigationItem>)).toEqual(true);
    })
})
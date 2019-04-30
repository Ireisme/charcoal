import React from 'react';
import { shallow } from "enzyme";
import { IconButton, Button } from '@material-ui/core';
import { Header } from '../Header';

describe('Header', () => {
  it('renders without crashing', () => {
    shallow(<Header onMenuClick={() => {}} logout={() => {}} />);
  });

  it('calls onMenuClick when the menu button is clicked', () => {
    const onMenuClick = jest.fn();
    const wrapper = shallow(<Header onMenuClick={onMenuClick} logout={() => {}} />);
    const button = wrapper.find(IconButton).dive();
    
    button.simulate('click');

    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it('calls logout when the logout button is clicked', () => {
    const logout = jest.fn();
    const wrapper = shallow(<Header onMenuClick={() => {}} logout={logout} />);
    const button = wrapper.find(Button).dive();
    
    button.simulate('click');

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
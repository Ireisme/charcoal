import React from 'react';
import { shallow } from "enzyme";
import { Drawer, IconButton } from '@material-ui/core';
import Header from '../Header';

describe('Header', () => {
  it('renders without crashing', () => {
    shallow(<Header onMenuClick={() => {}} />);
  });

  it('calls onMenuClick when the menu button is clicked', () => {
    const onMenuClick = jest.fn();
    const wrapper = shallow(<Header onMenuClick={onMenuClick} />);
    const button = wrapper.find(IconButton).dive();
    
    button.simulate('click');

    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });
});
import React from 'react';
import Sidebar from "../Sidebar";
import { shallow } from "enzyme";
import { Drawer } from '@material-ui/core';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    shallow(<Sidebar drawerOpen={false} onSidebarClose={() => {}} />);
  });

  it('renders a Drawer', () => {
    const drawerOpen = false;
    const toggleSidebar = () => {};
    const wrapper = shallow(<Sidebar drawerOpen={drawerOpen} onSidebarClose={toggleSidebar} />);
    const drawer = wrapper.find(Drawer).first();
  
    expect(drawer.props().open).toBe(drawerOpen);
    expect(drawer.props().onClose).toBe(toggleSidebar)
  });
});
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../Home';
import { Route } from 'react-router-dom';
import Sites from '../../sites/Sites';
import Header from '../Header';
import Sidebar from '../Sidebar';

describe('Home', () => {
  it('renders without crashing', () => {
    shallow(<Home drawerOpen={false} toggleSidebar={() => {}} />);
  });
  
  it('renders a Sites route', () => {
    const wrapper = shallow(<Home drawerOpen={false} toggleSidebar={() => {}} />);
    const sitesRoute = wrapper.find(Route).findWhere(route => route.prop('path') === '/home/sites');
  
    expect(sitesRoute.prop('component')).toEqual(Sites);
  });
  
  it('renders a Header', () => {
    const drawerOpen = false;
    const toggleSidebar = () => {};
    const wrapper = shallow(<Home drawerOpen={drawerOpen} toggleSidebar={toggleSidebar} />);
    const header = wrapper.find(Header).first();
  
    expect(header.prop('onMenuClick')).toBe(toggleSidebar);
  });
  
  it('renders a Sidebar', () => {
    const drawerOpen = false;
    const toggleSidebar = () => {};
    const wrapper = shallow(<Home drawerOpen={drawerOpen} toggleSidebar={toggleSidebar} />);
    const sidebar = wrapper.find(Sidebar).first();
  
    expect(sidebar.prop('drawerOpen')).toBe(drawerOpen);
    expect(sidebar.prop('onSidebarClose')).toBe(toggleSidebar);
  });
});

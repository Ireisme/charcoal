import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import Landing from './Landing';
import Home from './home/Home';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders a Landing route', () => {
  const wrapper = shallow(<App />);
  const landingRoute = wrapper.find(Route).findWhere(route => route.prop('path') === '/');

  expect(landingRoute.prop('component')).toEqual(Landing);
});

it('renders a Home route', () => {
  const wrapper = shallow(<App />);
  const homeRoute = wrapper.find(Route).findWhere(route => route.prop('path') === '/home');

  expect(homeRoute.prop('component')).toEqual(Home);
});
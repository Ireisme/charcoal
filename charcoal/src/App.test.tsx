import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { Route } from 'react-router-dom';
import Landing from './home/Landing';
import Home from './home/Home';
import Callback from './auth/Callback';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders a Home route', () => {
  const wrapper = shallow(<App />);
  const homeRoute = wrapper.find(Route).findWhere(route => route.prop('path') === '/home');

  expect(homeRoute.prop('component')).toEqual(Home);
});

it('renders a Callback route', () => {
  const wrapper = shallow(<App />);
  const callbackRoute = wrapper.find(Route).findWhere(route => route.prop('path') === '/callback');

  expect(callbackRoute.prop('component')).toEqual(Callback);
});

it('renders a Landing route', () => {
  const wrapper = shallow(<App />);
  const landingRoute = wrapper.find(Route).findWhere(route => route.prop('path') === '/');

  expect(landingRoute.prop('component')).toEqual(Landing);
});
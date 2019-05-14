import React from 'react';
import { shallow } from "enzyme";
import { Landing } from '../Landing';
import Button from '@material-ui/core/Button';

describe('Landing', () => {
  it('renders without crashing', () => {
    shallow(<Landing login={() => {}}/>);
  });

  it('should call login when login button is clicked', () => {
    const login = jest.fn();
    const wrapper = shallow(<Landing login={login} />);
    const button = wrapper.find(Button).dive();
    
    button.simulate('click');

    expect(login).toHaveBeenCalledTimes(1);
  })
});
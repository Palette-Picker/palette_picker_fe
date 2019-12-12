import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { getProjects } from '../../utils/apiCalls';

jest.mock('../../utils/apiCalls');

describe('App', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when colorCheck is called', () => {
    wrapper.instance().colorCheck();
    expect(wrapper.state().colors.length).toBe(5);
  });

  it('should update state when updateColors is called', () => {
    wrapper.instance().updateColors();
    expect(wrapper.state().colors.length).toBe(5);
  });

  it('should update state when toggleLock is called', () => {
    wrapper.instance().colorCheck();
    expect(wrapper.state().colors.length).toBe(5);
    wrapper.instance().toggleLock(1);
    expect(wrapper.state().colors[1].isLocked).toBe(true);
  });

  it('should reset portions of state if handleModal is called with cancel', () => {
    const mockEvent = { target: { name: 'cancel' } }
    const expected = {
      colors: [],
      error: '',
      modalOpen: false,
      paletteName: '',
      projectId: null,
      projectName: '',
      paletteId: null,
      projects: undefined
    }
    wrapper.setState({
      colors: ['color1', 'color2'],
      paletteName: 'New Palette',
      projectId: 2,
      projectName: 'Project 1',
      paletteId: 3,
    });
    wrapper.instance().handleModal(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });
})

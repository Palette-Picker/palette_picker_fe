import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

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
      projects: []
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

  it('should call passPaletteNameAndColors when handleModal is called', () => {

    const mockEvent = { target: { classList: { contains: jest.fn(() => true) } } };
    wrapper.instance().passPaletteNameAndColors = jest.fn();
    wrapper.instance().handleModal(mockEvent);
    expect(wrapper.instance().passPaletteNameAndColors).toHaveBeenCalled();
  });

  it('should update state when passPaletteNameAndColors is called', () => {
    const mockColors = ['color1', 'color2'];
    const mockProject = { id: 3, name: 'Project' };
    const mockPaletteName = 'Palette';
    const mockPaletteId = 45
    const expected = {
      colors: mockColors,
      error: '',
      modalOpen: false,
      paletteName: mockPaletteName,
      projectId: mockProject.id,
      projectName: mockProject.name,
      paletteId: mockPaletteId,
      projects: []
    }
    wrapper.instance().passPaletteNameAndColors(mockColors, mockProject, mockPaletteName, mockPaletteId);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should call handleModal when the "yes" modal button is clicked', () => {
    const mockEvent = { target: { name: 'cancel' } }
    wrapper.instance().handleModal = jest.fn();
    wrapper.find('Link').at(0).simulate('click', mockEvent);
    expect(wrapper.instance().handleModal).toHaveBeenCalledWith(mockEvent);
  });

    it('should call paletteDeleteHandler when the Delete Palette modal button is clicked', () => {
    const mockEvent = { preventDefault: jest.fn(), persist: jest.fn() }
    wrapper.instance().paletteDeleteHandler = jest.fn();
    wrapper.find('.btn--delete-palette').simulate('click', mockEvent);
    expect(wrapper.instance().paletteDeleteHandler).toHaveBeenCalledWith(mockEvent);
  });
});

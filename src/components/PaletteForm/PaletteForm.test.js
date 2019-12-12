import React from 'react';
import { shallow } from 'enzyme';
import PaletteForm from './PaletteForm';

describe('PaletteForm', () => {

  let wrapper;
  const mockColors = [
    {
      color1: "#82d173",
      isLocked: false
    },
    {
      color2: "#abfaa9",
      isLocked: false
    },
    {
      color3: "#95a3b3",
      isLocked: false
    },
    {
      color4: "#4c2c69",
      isLocked: false
    },
    {
      color5: "#42253b",
      isLocked: false
    }];
  const mockProjects = [
    {
      id: 19,
      name: "Colors",
      palettes: [
        {
          id: 29,
          name: "Purples and greens",
          color1: "#82d173",
          color2: "#abfaa9",
          color3: "#95a3b3",
          color4: "#4c2c69",
          color5: "#42253b",
          project_id: 19,
          created_at: "2019-12-09T00:11:51.362Z",
          updated_at: "2019-12-09T00:11:51.362Z"
        }]
    }];
  const mockPaletteId = null;
  const mockNewPaletteName = '';
  let mockOldProjectName = '';
  const mockSelectedProjectId = null;
  const mockPass = jest.fn();
  const mockUpdateColors = jest.fn();
  const mockToggleLock = jest.fn();
  const mockUpdateProjects = jest.fn();
  const mockEvent = jest.fn();
  const mockPreventEvent = { preventDefault: jest.fn()};

  beforeEach(() => {
    wrapper = shallow(
      <PaletteForm 
        colors={mockColors}
        passPaletteNameAndColors={mockPass}
        updateColors={mockUpdateColors}
        toggleLock={mockToggleLock}
        projects={mockProjects}
        updateProjects={mockUpdateProjects}
        paletteId={mockPaletteId}
        newPaletteName={mockNewPaletteName}
        oldProjectName={mockOldProjectName}
        selectedProjectId={mockSelectedProjectId}
      />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should update state when dropdown changes', () => {
    const mockDropdownChange = { target: { name: 'selectedProjectId', value: 19}};
    wrapper.instance().handleDropDownChange(mockDropdownChange);
    expect(wrapper.state('selectedProjectId')).toEqual(19);
  });

  it('should call handleDropDownChange when change happens', () => {
    wrapper.instance().handleDropDownChange = jest.fn();
    wrapper.find('select').simulate('change', mockEvent);
    expect(wrapper.instance().handleDropDownChange).toHaveBeenCalledWith(mockEvent);
  });

  it('should update state when input changes', () => {
    const mockInputChange = { target: { name: 'newProjectName', value: 'A New Project'}};
    wrapper.instance().handleInputChange(mockInputChange);
    expect(wrapper.state('newProjectName')).toEqual('A New Project');
  });

  it('should call handleInputChange when input event occurs', () => {
    const mockInputChange = { target: { name: 'newProjectName', value: 'A New Project'}};
    wrapper.instance().handleInputChange = jest.fn();
    wrapper.find('.create-project').simulate('change', mockInputChange);
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().handleInputChange).toHaveBeenCalled();
  });

  it('should call handleSubmitProject when submit is clicked', () => {
    wrapper.instance().handleSubmitProject = jest.fn();
    wrapper.find('.submit-btn').simulate('click', mockPreventEvent);
    expect(wrapper.instance().handleSubmitProject).toHaveBeenCalledWith(mockPreventEvent);
  });

  it('should call decidePaletteVerb when add button is clicked', () => {
    wrapper.instance().decidePaletteVerb = jest.fn();
    wrapper.find('.add-btn').simulate('click', mockEvent);
    expect(wrapper.instance().decidePaletteVerb).toHaveBeenCalledWith(mockEvent);
  });

  it('should call handleUpdatePalette if oldProjectName has a value after clicking add-btn', () => {
    wrapper.setProps({ oldProjectName: 'Old Name' });
    wrapper.instance().handleUpdatePalette = jest.fn();
    wrapper.instance().decidePaletteVerb(mockPreventEvent);
    expect(wrapper.instance().handleUpdatePalette).toHaveBeenCalledWith(mockPreventEvent)
  });

  it('should call handleAddPalette if oldProjectName is empty string after clicking add-btn', () => {

  });

  it('should call updateColors when random btn is clicked', () => {
    wrapper.find('.random').simulate('click');
    expect(mockUpdateColors).toHaveBeenCalled();
  });

  it('should call toggleLock when a color is clicked', () => {
    const mockIndex = 0;
    wrapper.find('.color').at(0).simulate('click', mockIndex);
    expect(mockToggleLock).toHaveBeenCalledWith(mockIndex);
  });

  it('should set state when clearInputs is called', () => {
    wrapper.setState({ newProjectName: 'New Name'});
    expect(wrapper.state('newProjectName')).toEqual('New Name');
    wrapper.instance().clearInput('newProjectName');
    expect(wrapper.state('newProjectName')).toEqual('');
  });

});
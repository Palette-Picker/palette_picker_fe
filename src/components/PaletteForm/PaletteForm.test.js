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
  const mockOldProjectName = '';
  const mockSelectedProjectId = null;
  const mockPass = jest.fn();
  const mockUpdateColors = jest.fn();
  const mockToggleLock = jest.fn();
  const mockUpdateProjects = jest.fn();

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

  });

  it('should update state when input changes', () => {

  });

  it('should call handleSubmitProject when submit is clicked', () => {

  });

  it('should call decidePalleteVerb when add button is clicked', () => {

  });

  it('should callUpdatePalette if oldProjectName has a value', () => {

  });

  it('should call handleAddPalette if oldProjectName is empty string', () => {

  });

  it('should clearInputs when called with a field', () => {

  });


});
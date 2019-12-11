import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {

  let wrapper;
  const mockProject = 
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
    };

    const mockPaletteUnlocked = [
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
      }
    ];

    const mockHandleModal = jest.fn();
    const mockHandleKeyPress = jest.fn();
    const mockHandleProjectDelete = jest.fn();
    const mockEvent = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ProjectCard
        project={mockProject}
        handleModal={mockHandleModal}
        handleKeyPress={mockHandleKeyPress}
        handleProjectDelete={mockHandleProjectDelete}
      />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleModal when a palette is clicked', () => {
    wrapper.find('.five-colors').simulate('click', mockEvent);
    expect(mockHandleModal).toHaveBeenCalledWith(mockEvent, mockPaletteUnlocked, { id: 19, name: 'Colors'}, 'Purples and greens', 29)
  });

  it('should call handleProjectDelete when img is clicked', () => {
    wrapper.find('.img--close').simulate('click');
    expect(mockHandleProjectDelete).toHaveBeenCalledWith(19);
  });

  it.skip('should call handleKeyPress when Enter is clicked from editable field', () => {
  const mockTypeEvent = { target: { innerText: 'Changed Project Name' } }
    wrapper.find('.project-name').simulate('keypress', 'Enter', mockEvent);
    // console.log(wrapper.find('.project-name'))
    expect(mockHandleKeyPress).toHaveBeenCalled();
    // expect(mockHandleKeyPress).toHaveBeenCalledWith(mockTypeEvent, 19, mockTypeEvent.target.innerText);
  });

});

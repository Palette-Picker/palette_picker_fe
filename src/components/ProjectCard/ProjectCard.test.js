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

  const mockPass = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ProjectCard
        project={mockProject}
        passPaletteNameAndColors={mockPass}
      />)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call passPaletteNameAndColors when clicked', () => {
    wrapper.find('div').at(0).simulate('click');
    // expect(mockPass).toHaveBeenCalledWith(paletteUnlocked, { 19, 'Colors'}, 'Purples and greens')
    expect(mockPass).toHaveBeenCalled();
  });

});

import React from 'react';
import { shallow } from 'enzyme';
import ProjectsContainer from './ProjectsContainer';

describe('ProjectsContainer', () => {

  let wrapper;
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

  const mockPass = jest.fn();
  const mockToggleModal = jest.fn();

  it('should match the snapshot', () => {
    wrapper = shallow(
      <ProjectsContainer
        projects={mockProjects}
        passPaletteNameAndColors={mockPass}
        toggleModal={mockToggleModal}
      />);
    expect(wrapper).toMatchSnapshot();
  });

});
import React from 'react';
import { shallow } from 'enzyme';
import ProjectsContainer from './ProjectsContainer';

describe('ProjectsContainer', () => {

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

  const mockHandleModal = jest.fn();
  const mockHandleKeyPress = jest.fn();
  const mockHandleProjectDelete = jest.fn();

  it('should match the snapshot', () => {
    const wrapper = shallow(
      <ProjectsContainer
        projects={mockProjects}
        handleModal={mockHandleModal}
        handleKeyPress={mockHandleKeyPress}
        handleProjectDelete={mockHandleProjectDelete}
      />);
    expect(wrapper).toMatchSnapshot();
  });

});
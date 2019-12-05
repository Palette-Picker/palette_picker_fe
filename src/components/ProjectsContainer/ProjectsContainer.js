import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.scss';

const ProjectsContainer = ({ projects }) => {

  return (
    <section>
      <h2>Project Container</h2>
      <ProjectCard />
    </section>
  )

};

export default ProjectsContainer;
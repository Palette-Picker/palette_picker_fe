import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.scss';

const ProjectsContainer = ({ projects }) => {
  const projCards = projects.map(project => {
    return <ProjectCard key={project.id} project={project}/>
  })
  return (
    <section>
      <h2>Project Container</h2>
      { projCards }
    </section>
  )

};

export default ProjectsContainer;
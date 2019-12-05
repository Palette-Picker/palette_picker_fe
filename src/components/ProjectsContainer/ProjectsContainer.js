import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.scss';

const ProjectsContainer = ({ projects }) => {
  const projCards = projects.map(project => {
    return <ProjectCard key={project.id} project={project}/>
  })
  return (
    <section className='projects'>
      { projCards }
    </section>
  )

};

export default ProjectsContainer;
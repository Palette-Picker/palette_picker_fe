import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.scss';

const ProjectsContainer = ({ projects, toggleModal }) => {
  const projCards = projects.map(project => {
    return <ProjectCard
      key={project.id}
      project={project}
      toggleModal={toggleModal} />
  })
  return (
    <section className='projects'>
      { projCards }
    </section>
  )

};

export default ProjectsContainer;
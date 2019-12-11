import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.scss';

const ProjectsContainer = ({ projects, handleModal, handleKeyPress, handleProjectDelete }) => {
  const projCards = projects.map(project => {
    return <ProjectCard
      key={project.id}
      project={project}
      handleProjectDelete={handleProjectDelete}
      handleKeyPress={handleKeyPress}
      handleModal={handleModal} />
  })
  return (
    <section className='projects'>
      { projCards }
    </section>
  )

};

export default ProjectsContainer;
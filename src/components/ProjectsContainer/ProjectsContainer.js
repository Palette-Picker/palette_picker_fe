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
      <h5>Click on any color palette to edit or delete it.</h5>
      { projCards }
    </section>
  )

};

export default ProjectsContainer;
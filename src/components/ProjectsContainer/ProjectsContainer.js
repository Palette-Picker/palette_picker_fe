import React from 'react';
import ProjectCard from '../ProjectCard/ProjectCard';
import './ProjectsContainer.scss';

const ProjectsContainer = ({ projects, passPaletteColors }) => {
  const projCards = projects.map(project => {
    return <ProjectCard key={project.id} project={project} passPaletteColors={passPaletteColors}/>
  })
  return (
    <section className='projects'>
      { projCards }
    </section>
  )

};

export default ProjectsContainer;
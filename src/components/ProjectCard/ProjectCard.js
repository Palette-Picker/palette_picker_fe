import React from 'react';
import './ProjectCard.scss';

const ProjectCard = ({ project }) => {
  const { palettes } = project;
  const paletteCards = palettes.map(palette => {
    return <section 
      key={palette.id}
      className='palette'
      >
      <h4>{palette.name}</h4>
      <div className='five-colors'>
        <div 
          className='palette-color'
          style={{backgroundColor: `${palette.color1}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${palette.color2}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${palette.color3}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${palette.color4}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${palette.color5}`}}
        ></div>
      </div>
    </section>
  })
  return (
    <article>
      <h2>{project.name}</h2>
      { paletteCards }
    </article>
  )

};

export default ProjectCard;
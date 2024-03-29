import React from 'react';
import './ProjectCard.scss';
import close from '../../images/close-icon-svg-4.jpg'
const ProjectCard = ({ project, handleModal, handleKeyPress, handleProjectDelete }) => {
  const { palettes } = project;
  const paletteCards = palettes.map(palette => {
    const { color1, color2, color3, color4, color5 } = palette;
    const paletteUnlocked = [
      {
        color1,
        isLocked: false
      },
      {
        color2,
        isLocked: false
      },
      {
        color3,
        isLocked: false
      },
      {
        color4,
        isLocked: false
      },
      {
        color5, 
        isLocked: false
      }  
    ]
    return <section 
      key={palette.id}
      className='palette'
      >
      <h4>{palette.name}</h4>
      <div
        className='five-colors'
        onClick={(e) => handleModal(e, paletteUnlocked, { id: project.id, name: project.name }, palette.name, palette.id)}
      >
        <div 
          className='palette-color'
          style={{backgroundColor: `${color1}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${color2}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${color3}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${color4}`}}
        ></div>
        <div 
          className='palette-color'
          style={{backgroundColor: `${color5}`}}
        ></div>
      </div>
    </section>
  })
  return (
    <article className="project-card">
      <div className="delete">
        <img 
          className="img--close"
          src={close}
          alt="x to close button" 
          onClick={() => handleProjectDelete(project.id)} />
        <p className="delete-text">Click to delete project and all of it's palettes.</p>
      </div>
      <h2 
        className="project-name"
        contenteditable="true" 
        onKeyPress={(e) => handleKeyPress(e, project.id, e.target.innerText)}>{project.name}</h2>
      {paletteCards}
    </article>
  )
};

export default ProjectCard;
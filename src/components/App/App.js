import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import Header from '../Header/Header';
import { getProjects, deletePalette, editProject, deleteProject } from '../../utils/apiCalls';
import PaletteForm from '../PaletteForm/PaletteForm';
import ProjectsContainer from '../ProjectsContainer/ProjectsContainer';

import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      projects: [],
      paletteName: '',
      paletteId: null,
      projectName: '',
      projectId: null,
      error: '',
      modalOpen: false,
    }
  }

  async componentDidMount() {
    this.updateProjects();
    this.colorCheck();
  }

  updateProjects = async () => {
    try {
      const projects = await getProjects();
      this.setState({ projects })
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  colorCheck = () => {
    let { colors } = this.state;
    if (colors.length < 5) {
      while (colors.length < 5) {
        colors.push(this.getRandomColor())
      }
      colors = colors.map((color, i) => {
        return { [`color${i + 1}`]: color, isLocked: false }
      })
      this.setState({ colors })
    }
  }

  getRandomColor() {
    return "#000000".replace(/0/g,() => {return (~~(Math.random()*16)).toString(16);});
  }

  updateColors = () => {
    let { colors } = this.state;
    colors = colors.map((color, i) => {
      if (color.isLocked === false) {
         return {
          [`color${i + 1}`]: this.getRandomColor(), 
          isLocked: false
        }
      } else {
        return color
      }
    })
    this.setState({ colors })
  }

  toggleLock = async (index) => {
    const { colors } = this.state;
    const updatedColors = colors.map((color, i) => {
      if (index === i){
        return { 
          [`color${i + 1}`]: color[`color${i + 1}`], 
          isLocked: !color.isLocked
        }
      } else {
        return color;
      }
    })
    await this.setState({ colors: updatedColors})
  }

  handleModal = async (e, colors, project, paletteName, paletteId) => {
    if (e.target.name === 'cancel') {
      await this.setState({
        colors: [],
        paletteName: '',
        projectId: null,
        projectName: '',
        paletteId: null
      })
      this.colorCheck();
    } else if (e.target.classList.contains('palette-color')) {
      this.passPaletteNameAndColors(colors, project, paletteName, paletteId)
    }
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  paletteDeleteHandler = async (e) => {
    e.preventDefault();
    e.persist();
    try {
      await deletePalette(this.state.paletteId);
      this.updateProjects();
      this.handleModal(e);
    } catch (error) {
      this.setState({ error });
    }
  }

  handleProjectDelete = async (id) => {
    try {
      await deleteProject(id);
      this.updateProjects();
    } catch (error) {
      this.setState({ error });
    }
  }

  passPaletteNameAndColors = (colors, project, paletteName, paletteId) => {
    this.setState({
      colors: colors,
      paletteName,
      projectId: project.id,
      projectName: project.name,
      paletteId
    });
  }

  handleKeyPress = (e, id, name) => {
    if (e.key === "Enter") {
      e.preventDefault();
      editProject(id, name);
      e.target.blur();
    }
  }

  render() {
    const { projects, colors, paletteId, paletteName, projectName, projectId } = this.state
    return (
      <div className='App'>
        <ReactModal
          ariaHideApp={false}
          isOpen={this.state.modalOpen}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
            },
            content: {}
          }}
          contentLabel="Edit Palette"
          className="EditPaletteModal"
          overlayClassName="EditPaletteOverlay"
        >
          <h2>Would you like to edit this palette?</h2>
          <section className='section--btn-holder'>
            <button className='btn--confirm-edit'>
              <Link onClick={e => this.handleModal(e)} to='/' name='edit'>Yes</Link>
            </button>
            <button className='btn--cancel-edit' name='cancel' onClick={e => this.handleModal(e)}>
              Cancel
            </button>
            <button onClick={e => this.paletteDeleteHandler(e)} className='btn--delete-palette'>
              Delete Palette
            </button>
          </section>
        </ReactModal>       
        <Header />
        <main>
          <Route exact path='/' render={() => <PaletteForm
            colors={colors}
            passPaletteNameAndColors={this.passPaletteNameAndColors}
            updateColors={this.updateColors}
            toggleLock={this.toggleLock}
            projects={projects}
            updateProjects={this.updateProjects}
            paletteId={paletteId}
            newPaletteName={paletteName}
            oldProjectName={projectName}
            selectedProjectId={projectId}
          />} />
          <Route exact path='/projects' render={() => <ProjectsContainer
            projects={this.state.projects}
            handleKeyPress={this.handleKeyPress}
            handleProjectDelete={this.handleProjectDelete}
            handleModal={this.handleModal} />} />
        </main>
      </div>
    )
  }
}

export default App;

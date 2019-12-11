import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import Header from '../Header/Header';
import { getProjects } from '../../utils/apiCalls';
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
      projectName: '',
      projectId: null,
      error: '',
      modalOpen: false,
    }
  }

  async componentDidMount() {
    this.updateProjects();
  }

  updateProjects = async () => {
    try {
      const projects = await getProjects();
      this.setState({ projects })
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  toggleModal = (e, colors, project, paletteName) => {
    if (e.target.name === 'cancel') {
      this.setState({
        colors: [],
        paletteName: '',
        projectId: null,
        projectName: ''
      })
    } else if (e.target.classList.contains('palette-color')) {
      this.passPaletteNameAndColors(colors, project, paletteName)
    }
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  passPaletteNameAndColors = (colors, project, paletteName) => {
    this.setState({
      colors: colors,
      paletteName,
      projectId: project.id,
      projectName: project.name
    });
  }

  render() {
    const { projects, error } = this.state
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
          <button>
            <Link onClick={e => this.toggleModal(e)} to='/' name='edit'>Yes</Link>
          </button>
          <button name='cancel' onClick={e => this.toggleModal(e)}>
            Cancel
          </button>
        </ReactModal>       
        <Header />
        <main>
          <Route exact path='/' render={() => <PaletteForm
            colors={this.state.colors}
            projects={projects}
            updateProjects={this.updateProjects}
            newPaletteName={this.state.paletteName}
            oldProjectName={this.state.projectName}
            selectedProjectId={this.state.projectId}
          />} />
          <Route exact path='/projects' render={() => <ProjectsContainer
            projects={projects}
            toggleModal={this.toggleModal} />} />
        </main>
      </div>
    )
  }
}

export default App;

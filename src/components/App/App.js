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

  passPaletteColors = async (colors) => {
    await this.setState({ colors: colors });
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
            <Link to='/'>Yes</Link>
          </button>
          <button>
            Cancel
          </button>
        </ReactModal>       
        <Header />
        <main>
          <Route exact path='/' render={() => <PaletteForm colors={this.state.colors} projects={projects} updateProjects={this.updateProjects} />}/>
          <Route exact path='/projects' render={() => <ProjectsContainer projects={projects} passPaletteColors={this.passPaletteColors} />}/>
        </main>
      </div>
    )
  }
}

export default App;

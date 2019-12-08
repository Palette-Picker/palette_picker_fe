import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import { getProjects } from '../../utils/apiCalls';
import PaletteForm from '../PaletteForm/PaletteForm';
import ProjectsContainer from '../ProjectsContainer/ProjectsContainer';

import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      error: ''
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

  render() {
    const { projects, error } = this.state
    return (
      <div className='App'>
        <Header />
        <main>
          <Route exact path='/' render={() => <PaletteForm projects={projects} updateProjects={this.updateProjects}/>}/>
          <Route exact path='/projects' render={() => <ProjectsContainer projects={projects}/>}/>
        </main>
      </div>
    )
  }
}

export default App;

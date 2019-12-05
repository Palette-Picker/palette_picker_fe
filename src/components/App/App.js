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
      error: '',
      isLoading: true
    }
  }

  async componentDidMount() {
    try {
      const projects = await getProjects();
      this.setState({ projects, isLoading: false })
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  render() {
    const { projects, error, isLoading } = this.state
    console.log('state', projects)
    console.log('error', error)
    console.log('loading', isLoading)
    return (
      <div className='App'>
        <Header />
        <main>
          <Route exact path='/' render={() => <PaletteForm projects={projects}/>}/>
          <Route exact path='/projects' render={() => <ProjectsContainer projects={projects}/>}/>

        </main>
      </div>

    )
  }
}

export default App;

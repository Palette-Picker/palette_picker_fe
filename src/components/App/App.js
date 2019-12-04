import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import { getProjects } from '../../utils/apiCalls';
import PaletteForm from '../PaletteForm/PaletteForm';
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
    try {
      const projects = await getProjects();
      this.setState({ projects })
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  render() {
    const { projects, error } = this.state
    console.log('state', projects)
    console.log('error', error)
    return (
      <div className='App'>
        <Header />
        <main>
          <Route exact path='/' render={() => <PaletteForm />}/>
        </main>
      </div>

    )
  }
}

export default App;

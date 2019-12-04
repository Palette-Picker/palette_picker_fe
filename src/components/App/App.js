import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header';
import PaletteForm from '../PaletteForm/PaletteForm';
import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    }
  }

  // componentDidMount() {

  // }

  render() {

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

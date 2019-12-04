import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header'
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
      <main>
        <Header />

      </main>

    )
  }
}

export default App;

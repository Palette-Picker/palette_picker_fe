import React, { Component } from 'react';
import './PaletteForm.scss';

class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      newProjectName: '',
      newPaletteName: '',
      selectedProjectId: null,
    }
  }

  componentDidMount() {
    let colors = [];
    while (colors.length < 5) {
      colors.push(this.getRandomColor())
    }
    this.setState({ colors })
  }

  getRandomColor() {
    return "#000000".replace(/0/g,() => {return (~~(Math.random()*16)).toString(16);});
  }

  updateColors(e) {
    let colors = [];
    while (colors.length < 5) {
      colors.push(this.getRandomColor())
    }
    this.setState({ colors })
  }

  handleDropDownChange(e) {
    // add error handling for not selected

    this.setState({ selectedProjectId: e.target.value});
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {

  }

  handleAdd(e) {

  }

  render() {
    const { projects } = this.props;
    const { colors } = this.state;
    const colorBtns = colors.map(color => {
      return <button
            key={color} 
            className='color' 
            style={{backgroundColor: `${color}`}}
          >{color.toUpperCase()}</button>
    });

    const projNames = projects.map(proj => {
      return <option
        key={proj.name}
        value={proj.id}
        >{proj.name}</option>
    })
    return (

      <div>
        <section className='color-section'>
          { colorBtns }
        </section>
        <button 
          className='random'
          onClick={this.updateColors.bind(this)}
        >Randomize!</button>

        <section className='forms'>
          <form>
            <h3>Create a New Project</h3>
            <input 
              className='createProject' 
              name='newProjectName'
              type='text' 
              value={this.newProjectName}
              placeholder='Enter Project Name'
              onChange={this.handleInputChange.bind(this)}
            />
            <button>Submit</button>
          </form>
          <form>
            <h3>Add this Palette to a Project</h3>
            <select
              value={this.selectedProjectId}
              defaultValue={'default'}
              onChange={this.handleDropDownChange.bind(this)}
            >
            <option value='default' disabled>Choose a Project ...</option>
            { projNames }
            </select>
            <input 
              className='createPalette'
              name='newPaletteName'
              type='text' 
              value={this.newPaletteName}
              placeholder='Enter New Palette Name'
              onChange={this.handleInputChange.bind(this)}
            />
            <button>Add</button>
          </form>
        </section>
      </div>

    )
  }
};

export default PaletteForm;

import React, { Component } from 'react';
import { addProject } from '../../utils/apiCalls';
import './PaletteForm.scss';

class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      newProjectName: '',
      newPaletteName: '',
      selectedProjectId: null,
      error: ''
    }
  }

  componentDidMount() {
    let colors = [];
    while (colors.length < 5) {
      colors.push(this.getRandomColor())
    }
    colors = colors.map((color, i) => {
      return { [`color${i + 1}`]: color, isLocked: false }
    })
    this.setState({ colors })
  }

  getRandomColor() {
    return "#000000".replace(/0/g,() => {return (~~(Math.random()*16)).toString(16);});
  }

  updateColors = (e) => {
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
    // while (colors.length < 5) {
    //   colors.push(this.getRandomColor())
    // }
    this.setState({ colors })
  }

  toggleLock = (index) => {
    console.log('in toggle index', index)
    const { colors } = this.state;
    const updatedColors = colors.map((color, i) => {
      console.log('i', i)
      console.log('index', index)
      if (index === i){
        return { 
          [`color${i + 1}`]: color[`color${i + 1}`], 
          isLocked: !color.isLocked
        }
      } else {
        return color;
      }
    })
    console.log(updatedColors)
  }

  handleDropDownChange = (e) => {
    // add error handling for not selected

    this.setState({ selectedProjectId: e.target.value});
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmitProject = async (e) => {
    e.preventDefault();
    const { updateProjects } = this.props;
    const { newProjectName } = this.state;
    try {
      await addProject(newProjectName);
      updateProjects();
    } catch ({ error }) {
      this.setState({ error })
    }
  }

  handleAddPalette = (e) => {

  }

  render() {
    const { projects } = this.props;
    const { colors } = this.state;
    const colorBtns = colors.map((color, i) => {
      const hexCode = color[`color${i + 1}`];
      return <button
            key={hexCode} 
            className='color' 
            style={{backgroundColor: hexCode}}
            onClick={() => this.toggleLock(i)}
          >{hexCode.toUpperCase()}</button>
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
          onClick={this.updateColors}
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
              onChange={this.handleInputChange}
            />
            <button
              onClick={this.handleSubmitProject}
            >Submit</button>
          </form>
          <form>
            <h3>Add this Palette to a Project</h3>
            <select
              value={this.selectedProjectId}
              defaultValue={'default'}
              onChange={this.handleDropDownChange}
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
              onChange={this.handleInputChange}
            />
            <button>Add</button>
          </form>
        </section>
      </div>

    )
  }
};

export default PaletteForm;

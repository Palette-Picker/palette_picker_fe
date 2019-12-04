import React, { Component } from 'react';
import './PaletteForm.scss';

class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      newProjectName: '',
      newPaletteName: '',
      selectedProjectName: ''
    }
  }

  // componentDidMount() {
  //   // method for getting 5 random colors to set state
  // }

  updateDropdownChange(e) {
    // add method for updating state
    console.log('dropdown changed')
  }

  render() {

    return (

      <div>
        <section className='color-section'>
          <div className='color'>Color 1</div>
          <div className='color'>Color 2</div>
          <div className='color'>Color 3</div>
          <div className='color'>Color 4</div>
          <div className='color'>Color 5</div>
        </section>
        <button className='random'>Randomize!</button>

        <section className='forms'>
          <form>
            <h3>Create a New Project</h3>
            <input 
              className='createProject' 
              name='newProjectName'
              type='text' 
              placeholder='Enter New Project Name'
            />
            <button>Submit</button>
          </form>
          <form>
            <h3>Add this Palette to a Project</h3>
            <input 
              className='createPalette'
              name='newPaletteName'
              type='text' 
              placeholder='Enter New Palette Name'
            />
            <h4>or</h4>
            <select
              value='Select an exsiting Project'
              onChange={this.updateDropdownChange}
            >
            </select>
            <button>Add</button>
          </form>
        </section>
      </div>

    )
  }
};

export default PaletteForm;
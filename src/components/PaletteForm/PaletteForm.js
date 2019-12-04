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

      <section>
        <section className='color-section'>
          <div className='color'>Color 1</div>
          <div className='color'>Color 2</div>
          <div className='color'>Color 3</div>
          <div className='color'>Color 4</div>
          <div className='color'>Color 5</div>
        </section>
        <button className='random'>Randomize!</button>
        <form>
          <label htmlFor='newProjectName'>Create a Project</label>
          <input 
            className='createProject' 
            name='newProjectName'
            type='text' 
            placeholder='Enter New Project Name'
          />
          <button>Submit</button>
          <select
            value='Select a Project'
            onChange={this.updateDropdownChange}
          >
            
          </select>

          <label htmlFor='newPaletteName'>Palette Name</label>
          <input 
            className='createPalette'
            name='newPaletteName'
            type='text' 
            placeholder='Enter New Palette Name'
          />
          <button>Add</button>
        </form>
      </section>

    )
  }
};

export default PaletteForm;
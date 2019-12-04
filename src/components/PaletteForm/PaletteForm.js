import React, { Component } from 'react';
import './PaletteForm.scss';

class PaletteForm extends Component {
  constructor() {
    super();
    this.state = {
      colors: [
        "#5c6f68",
        "#8aa39b",
        "#95d9c3",
        "#a4f9c8",
        "#a7fff6",
      ],
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
    const { projects } = this.props;
    const { colors } = this.state;
    // console.log(colors)
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
        value={proj.name}
        >{proj.name}</option>
    })
    return (

      <div>
        <section className='color-section'>
          { colorBtns }
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
            >{ projNames }
            </select>
            <button>Add</button>
          </form>
        </section>
      </div>

    )
  }
};

export default PaletteForm;


// <button 
//             className='color' 
//             backgroundColor: {`${colors[0]}`}
//           >Color 1</button>
//           <button className='color'>Color 2</button>
//           <button className='color'>Color 3</button>
//           <button className='color'>Color 4</button>
//           <button className='color'>Color 5</button>
import React, { Component } from 'react';
import { addProject, addPalette, editPalette } from '../../utils/apiCalls';
import locked from '../../images/padlocked.png';
import unlocked from '../../images/padunlocked.png';
import './PaletteForm.scss';

class PaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newProjectName: '',
      newPaletteName: this.props.newPaletteName || '',
      selectedProjectId: this.props.selectedProjectId || null,
      error: ''
    }
  }

  handleDropDownChange = (e) => {
    this.setState({ selectedProjectId: e.target.value});
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmitProject = async (e) => {
    e.preventDefault();
    const { updateProjects } = this.props;
    const { newProjectName } = this.state;
    let projectPost = await addProject(newProjectName);
    if (projectPost.error) {
      this.setState({error: projectPost.error})
    } else {
      await updateProjects();
    }
    this.clearInput('newProjectName');
  }

  decidePaletteVerb = (e) => {
    const { oldProjectName } = this.props;
    if (oldProjectName) {
      this.handleUpdatePalette(e)
    } else {
      this.handleAddPalette(e)
    }
  }

  handleUpdatePalette = async (e) => {
    const { updateProjects } = this.props;
    e.preventDefault();
     const { newPaletteName,
      selectedProjectId } = this.state;
    const { colors, paletteId } = this.props;
    const alteredPalette = {
      id: paletteId,
      name: newPaletteName,
      color1: colors[0].color1,
      color2: colors[1].color2,
      color3: colors[2].color3,
      color4: colors[3].color4,
      color5: colors[4].color5,
      project_id: selectedProjectId
    };
    try {
      await editPalette(alteredPalette);
      await updateProjects();
      this.clearInput('newPaletteName')
      this.props.passPaletteNameAndColors(colors, '', null, '', null)
    } catch (error) {
      this.setState({ error });
    }
  }

  handleAddPalette = async (e) => {
    e.preventDefault();
    const { updateProjects } = this.props;
    const { newPaletteName,
      selectedProjectId } = this.state;
    const { colors } = this.props;
    const newPalette = {
      name: newPaletteName,
      color1: colors[0].color1,
      color2: colors[1].color2,
      color3: colors[2].color3,
      color4: colors[3].color4,
      color5: colors[4].color5,
      project_id: selectedProjectId
    };
    const res = await addPalette(newPalette);
    if (res.error) {
      this.setState({ error: res.error });
    } else {
      await updateProjects();
    }
      this.clearInput('newPaletteName');
  }

  clearInput = (field) => {
    this.setState({
      [field]: ''
    })
  }

  render() {
    const { colors, oldProjectName, projects } = this.props;
    const colorBtns = colors.length ? colors.map((color, i) => {
      const hexCode = color[`color${i + 1}`];
      return <button
            key={hexCode} 
            className='color' 
            style={{backgroundColor: hexCode}}
            onClick={() => this.props.toggleLock(i)}>
        {hexCode.toUpperCase()}{color.isLocked ? <img className='img--padlock' src={locked} alt="closed lock" /> : <img className='img--padlock' src={unlocked} alt="opened lock"/> }
        </button>
    }) : null;

    const projNames = projects.map(proj => {
      return <option
        selected={proj.name === oldProjectName ? true : false}
        key={proj.name}
        value={proj.id}
        >{proj.name}</option>
    });

    return (

      <div className="home">
        <section className="color-section">
          { colorBtns }
        </section>
        <button 
          className="random"
          onClick={() => this.props.updateColors()}
        >Randomize!</button>
        {this.state.error && <p className='p--project-error'>{this.state.error}</p>}
        <section className='forms'>
          <form>
            <h3>Create a New Project</h3>
            <input 
              className='create-project' 
              name='newProjectName'
              type='text' 
              value={this.state.newProjectName}
              placeholder='Enter Project Name'
              onChange={(e) => this.handleInputChange(e)}
            />
            <button
              className="submit-btn"
              onClick={(e) => this.handleSubmitProject(e)}
            >Submit</button>
          </form>
          <form>
            {this.props.oldProjectName  && <h3>{`Editing ${this.state.newPaletteName}`} </h3>}
            {!this.props.oldProjectName && <h3>Add this Palette to a Project</h3>}
            <select
              onChange={(e) => this.handleDropDownChange(e)}
            >
              <option 
                value='default' 
                selected={!oldProjectName ? true : false} 
                disabled
              >Choose a Project ...</option>
              { projNames }
            </select>
            <input 
              className='createPalette'
              name='newPaletteName'
              type='text' 
              value={this.state.newPaletteName}
              placeholder='Enter New Palette Name'
              onChange={this.handleInputChange}
            />
            <button
              className="add-btn"
              onClick={e => this.decidePaletteVerb(e)}
            >{!this.props.oldProjectName ? 'Add' : 'Save'}</button>
          </form>
        </section>
      </div>
    )
  }
};

export default PaletteForm;

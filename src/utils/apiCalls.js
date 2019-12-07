const baseUrl = 'https://palette-picker-1906-be.herokuapp.com/api/v1';

export const getProjects = async () => {
  const response = await fetch(`${baseUrl}/projects`)

  if (!response.ok) {
    throw Error('Unable to get projects. Try again later.')
  }
  const projects = await response.json();
  return projects;
};

export const addProject = async (newProject) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name: newProject
    }),
    headers: {
      'content-type': 'application/json'
    }
  };
  const response = await fetch(`${baseUrl}/projects`, options);
  if (!response.ok) {
    throw Error('Unable to add project.')
  };
  const addedProject = await response.json();
  return addedProject;
};

export const addPalette = async (newPalette) => {
  const options = {
    method: 'POST', 
    body: JSON.stringify({
      name: newPalette.name,
      color1: newPalette.color1,
      color2: newPalette.color2,
      color3: newPalette.color3,
      color4: newPalette.color4,
      color5: newPalette.color5,
      project_id: newPalette.project_id
    }),
    headers: {
      'content-type': 'application/json'
    }
  };
    const response = await fetch(`${baseUrl}/palettes`, options);
    if (!response.ok) {
      throw Error('Unable to add palette')
    };
    const addedPalette = await response.json();
    return addedPalette;
};


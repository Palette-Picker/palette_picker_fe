const baseUrl = 'https://palette-picker-1906-be.herokuapp.com/api/v1';
// const baseUrl = 'http://localhost:3001/api/v1';

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
      throw Error('Unable to add palette.')
    };
    const addedPalette = await response.json();
    return addedPalette;
};

export const deletePalette = async (paletteId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  };
  const response = await fetch(`${baseUrl}/palettes/${paletteId}`, options);
  if (!response.ok) {
    throw Error('Unable to delete the palette.')
  };
  const removedId = await response.json();
  return removedId;
};

export const deleteProject = async (projectId) => {
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  };
  const response = await fetch(`${baseUrl}/projects/${projectId}`, options);
  if (!response.ok) {
    throw Error('Unable to delete the project and its palettes.')
  };
  const removedId = await response.json();
  return removedId;
};

export const editProject = async (projectId, newName) => {
  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      name: newName
    }),
    headers: {
      'content-type': 'application/json'
    }
  };
  const response = await fetch(`${baseUrl}/projects/${projectId}`, options);
  if (!response.ok) {
    throw Error('Unable to rename the project. Try again later.')
  };
  const updatedProject = await response.json();
  return updatedProject;
};

export const editPalette = async (changedPalette) => {
  const { id, name, color1, color2, color3, color4, color5, project_id } = changedPalette;
  const options = {
    method: 'PATCH',
    body: JSON.stringify ({
      id,
      name,
      color1,
      color2,
      color3,
      color4,
      color5,
      project_id
    }),
    headers: {
      'content-type': 'application/json'
    }
  };
  const response = await fetch(`${baseUrl}/palettes/${id}`, options);
  if (!response.ok) {
    throw Error('Unable to edit palette. Try again later.')
  }
  const updatedPalette = await response.json()
  return updatedPalette;
};
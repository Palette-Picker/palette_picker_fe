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
  const addedProject = await response.json()
  console.log('added in apiCalls', addedProject)
};


const baseUrl = 'http://localhost:3001/api/v1';

export const getProjects = async () => {
  const response = await fetch(`${baseUrl}/projects`)

  if (!response.ok) {
    throw Error('Unable to get projects. Try again later.')
  }
  const projects = await response.json();
  return projects;
};


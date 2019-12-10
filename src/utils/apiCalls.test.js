import { getProjects, addProject, addPalette, deletePalette, deleteProject, editProject, editPalette } from './apiCalls';


const mockProjects = [
  {
    id: 19,
    name: "Amy's Colors",
    palettes: [
      {
        id: 29,
        name: "Purples and greens",
        color1: "#82d173",
        color2: "#abfaa9",
        color3: "#95a3b3",
        color4: "#4c2c69",
        color5: "#42253b",
        project_id: 19,
        created_at: "2019-12-09T00:11:51.362Z",
        updated_at: "2019-12-09T00:11:51.362Z"
      },
      {
        id: 30,
        name: "Pastels",
        color1: "#d3f8e2",
        color2: "#e4c1f9",
        color3: "#f694c1",
        color4: "#ede7b1",
        color5: "#a9def9",
        project_id: 19,
        created_at: "2019-12-09T00:11:51.367Z",
        updated_at: "2019-12-09T00:11:51.367Z"
      }]
  },
  {
    id: 20,
    name: "Chris's Colors",
    palettes: [
      {
        id: 31,
        name: "Blues and a Coral",
        color1: "#bd9391",
        color2: "#adbabd",
        color3: "#91b7c7",
        color4: "#6eb4d1",
        color5: "#6cbeed",
        project_id: 20,
        created_at: "2019-12-09T00:11:51.374Z",
        updated_at: "2019-12-09T00:11:51.374Z"
      },
      {
        id: 32,
        name: "Greens",
        color1: "#5c6f68",
        color2: "#8aa39b",
        color3: "#95d9c3",
        color4: "#a4f9c8",
        color5: "#a7fff6",
        project_id: 20,
        created_at: "2019-12-09T00:11:51.379Z",
        updated_at: "2019-12-09T00:11:51.379Z"
      }]
  }];

const baseUrl = 'https://palette-picker-1906-be.herokuapp.com/api/v1';

describe('getProjects', () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProjects)
      })
    });
  });

  it('should call getProjects with the correct url', () => {
    getProjects();
    expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/projects`)
  });

  it('should return an array of projects with their palettes', () => {
    expect(getProjects()).resolves.toEqual(mockProjects)
  });

  it('should throw an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });

    expect(getProjects()).rejects.toEqual(Error('Unable to get projects. Try again later.'));
  });

  it('should throw and error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    });

    expect(getProjects()).rejects.toEqual(Error('fetch failed'));
  });
});

describe('addProject', () => {

  const mockProjectName = 'New Project';
  const mockNewProject = {
    id: 33,
    name: mockProjectName
  };
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name: mockProjectName
    }),
    headers: {
      'content-type': 'application/json'
    }
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNewProject)
      })
    });
  });

  it('should call addProject with the correct url and options', () => {
    addProject(mockProjectName);
    expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/projects`, options);
  });

  it('should return the added project object', () => {
    expect(addProject(mockProjectName)).resolves.toEqual(mockNewProject);
  });

  it.skip('should return an error with a 422 code if name is missing from request', () => {
  //   const missingProjectName = '';
  //   const options = {
  //   method: 'POST',
  //   body: JSON.stringify(),
  //   headers: {
  //     'content-type': 'application/json'
  //   }
  // };
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        status: 422,
        json: () => Promise.resolve({
          status: 422
        })
      })
    });
    expect(addProject()).rejects.toEqual(Error('Required parameter of "name" is missing from request'))
  });

  it('should throw an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(addProject(mockProjectName)).rejects.toEqual(Error('Unable to add project.'))
  });

  it('should throw and error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    });

    expect(addProject()).rejects.toEqual(Error('fetch failed'));
  });
});
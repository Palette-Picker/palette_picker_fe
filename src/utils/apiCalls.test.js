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

  it('should throw an error if the server is down', () => {
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

  it('should throw an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(addProject(mockProjectName)).rejects.toEqual(Error('Unable to add project.'))
  });

  it('should throw an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    });

    expect(addProject(mockProjectName)).rejects.toEqual(Error('fetch failed'));
  });
});

describe('addPalette', () => {

  const mockPalette = {
    name: 'New Palette',
    color1: '#123456',
    color2: '#abcdef',
    color3: '#789012',
    color4: '#ghijkl',
    color5: '#345678',
    project_id: 19
  };

  const mockNewPalette = {
    id: 31,
    name: 'New Palette',
    color1: '#123456',
    color2: '#abcdef',
    color3: '#789012',
    color4: '#ghijkl',
    color5: '#345678',
    project_id: 19
  };
  const options = {
    method: 'POST',
    body: JSON.stringify({
      name: mockPalette.name,
      color1: mockPalette.color1,
      color2: mockPalette.color2,
      color3: mockPalette.color3,
      color4: mockPalette.color4,
      color5: mockPalette.color5,
      project_id: mockPalette.project_id
    }),
    headers: {
      'content-type': 'application/json'
    }
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockNewPalette)
      })
    });
  });

  it('should call addPalette with the correct url and options', () => {
    addPalette(mockPalette);
    expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/palettes`, options)
  });

  it('should return the added palette object', () => {
    expect(addPalette(mockPalette)).resolves.toEqual(mockNewPalette);
  });

  it('should return an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(addPalette(mockPalette)).rejects.toEqual(Error('Unable to add palette.'));
  });

  it('should throw an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('fetch failed'))
    });

    expect(addPalette(mockPalette)).rejects.toEqual(Error('fetch failed'));
  });
});

describe('deletePalette', () => {
  const mockId = 29;
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  };
  const mockResponse = { id: mockId}

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    });
  });

  it('should call deletePalette with the correct url and options', () => {
    deletePalette(mockId);
    expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/palettes/${mockId}`, options);
  });

  it('should return the deleted palette\'s id', () => {
    expect(deletePalette(mockId)).resolves.toEqual(mockResponse);
  });

  it('should return an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(deletePalette(mockId)).rejects.toEqual(Error('Unable to delete the palette.'));
  });

  it('should return and error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('failed to fetch'))
    });
    expect(deletePalette(mockId)).rejects.toEqual(Error('failed to fetch'));
  });

});

describe('deleteProject', () => {
  const mockId = 19;
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  };
  const mockResponse = { id: mockId}

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    });
  });

  it('should call deleteProject with the correct url and options', () => {
    deleteProject(mockId);
    expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/projects/${mockId}`, options);
  });

  it('should return the deleted project\'s id', () => {
    expect(deleteProject(mockId)).resolves.toEqual(mockResponse);
  });

  it('should return an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(deleteProject(mockId)).rejects.toEqual(Error('Unable to delete the project and its palettes.'));
  });

  it('should return and error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('failed to fetch'))
    });
    expect(deleteProject(mockId)).rejects.toEqual(Error('failed to fetch'));
  });

});

describe('editProject', () => {
  const mockId = 19;
  const mockEditedName = 'Edited Name';
  const options = {
    method: 'PATCH',
    body: {
      name: mockEditedName
    },
    headers: {
      'content-type': 'application/json'
    }
  };
  const mockResponse = {
    id: 19,
    name: mockEditedName
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      })
    });
  });

  it('should call editProject with the correct url and options', () => {
    editProject(mockId, mockEditedName);
    expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/projects/${mockId}`, options);
  });

  it('should return the edited project', () => {
    expect(editProject(mockId, mockEditedName)).resolves.toEqual(mockResponse);
  });

  it('should return an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(editProject(mockId, mockEditedName)).rejects.toEqual(Error('Unable to rename the project. Try again later.'));
  });

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('failed to fetch'))
    });
    expect(editProject(mockId, mockEditedName)).rejects.toEqual(Error('failed to fetch'));
  });

});

describe('editPalette', () => {
  const mockEditedPalette = {
    id: 29,
    name: "Greens and Purples",
    color1: "#82d173",
    color2: "#abfaa9",
    color3: "#abcdef",
    color4: "#4c2c69",
    color5: "#42253b",
    project_id: 19
  };
  const options = {
    method: 'PATCH',
    body: {
      id: mockEditedPalette.id,
      name: mockEditedPalette.name,
      color1: mockEditedPalette.color1,
      color2: mockEditedPalette.color2,
      color3: mockEditedPalette.color3,
      color4: mockEditedPalette.color4,
      color5: mockEditedPalette.color5,
      project_id: mockEditedPalette.project_id
    },
    headers: {
      'content-type': 'application/json'
    }
  };

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockEditedPalette)
      })
    });
  });

  it('should call editPalette with the correct url and options', () => {
    editPalette(mockEditedPalette);
    expect(window.fetch).toHaveBeenCalledWith(`${baseUrl}/palettes/${mockEditedPalette.id}`, options);
  });

  it('should return the edited palette', () => {
    expect(editPalette(mockEditedPalette)).resolves.toEqual(mockEditedPalette);
  });

  it('should return an error if the response is not ok', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    });
    expect(editPalette(mockEditedPalette)).rejects.toEqual(Error('Unable to edit palette. Try again later.'));
  });

  it('should return an error if the server is down', () => {
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject(Error('failed to fetch'))
    });
    expect(editPalette(mockEditedPalette)).rejects.toEqual(Error('failed to fetch'));
  });

});
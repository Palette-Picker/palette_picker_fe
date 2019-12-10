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


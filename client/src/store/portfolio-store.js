import { initStore } from './store';
import axios from '../axios-PortfolioAPI';

const configureStore = () => {
  const asyncActions = {
    LOGIN: async (globalState, payload) => {
      const newState = {
        isLoggedIn: false,
      };

      await axios
        .post('/users/login', payload.body)
        .then(() => {
          newState.isLoggedIn = true;
          newState.message = {
            type: 'success',
            text: 'Du er no innlogga som admin.',
          };
        })
        .catch((err) => err);

      return newState;
    },
    LOGIN_GUEST: async () => {
      const newState = {
        message: {
          type: 'success',
          text: 'Du er no innlogga som gjest.',
        },
        isLoggedIn: false,
      };

      await axios
        .get('/users/loginGuest')
        .then(() => {
          newState.isLoggedIn = true;
        })
        .catch((err) => err);

      return newState;
    },
    LOGOUT: async () => {
      const newState = {
        message: {
          type: 'success',
          text: 'Du er no logga ut.',
        },
        isLoggedIn: true,
      };

      await axios
        .get('/users/logout')
        .then(() => {
          newState.isLoggedIn = false;
        })
        .catch((err) => err);

      return newState;
    },
    GET_USER: async () => {
      let user;
      await axios
        .get('/users/5ed0e277d98bd71b080ec102')
        .then((response) => {
          user = response.data.data.data;
        })
        .catch((err) => err);

      if (user) return { user };
    },
    PATCH_USER: async (globalState, payload) => {
      const newState = {};

      await axios
        .patch('/users/5ed0e277d98bd71b080ec102', payload.formData)
        .then((response) => {
          newState.user = response.data.data.data;
          newState.message = {
            type: 'success',
            text: 'Bruker oppdatert',
          };
        })
        .catch((err) => err);

      if (newState.user) return newState;
    },
    GET_SECTIONS: async () => {
      let sections;
      await axios
        .get(`/sections?sort=position`)
        .then((response) => {
          sections = response.data.data.data;
        })
        .catch((err) => err);
      if (sections) return { sections };
    },
    POST_SECTION: async (globalState, payload) => {
      const newState = {};
      let section;

      await axios
        .post('/sections', payload)
        .then((response) => {
          section = response.data.data.data;
          newState.message = {
            type: 'success',
            text: 'Ny seksjon lagret',
          };
        })
        .catch((err) => err);

      newState.sectionDocId = section._id;
      newState.sections = [...globalState.sections, section];
      if (section) return newState;
    },
    PATCH_SECTION: async (globalState, payload) => {
      const newState = {};
      let sections = [...globalState.sections];
      let updatedSection;
      const body = {
        name: payload.formData.get('name'),
        position: payload.formData.get('position'),
      };

      await axios
        .patch(`/sections/${payload.id}`, body)
        .then((response) => {
          updatedSection = response.data.data.data;
          newState.message = {
            type: 'success',
            text: 'Seksjon oppdatert',
          };
        })
        .catch((err) => err);

      newState.sections = sections.map((section) => {
        if (section._id === payload.id) {
          return updatedSection;
        } else {
          return section;
        }
      });

      if (updatedSection) return newState;
    },
    DELETE_SECTION: async (globalState, payload) => {
      const newState = {
        sectionDocId: null,
      };
      let sections = [...globalState.sections];
      let error;

      await axios
        .delete(`/sections/${payload}`)
        .then(() => {
          newState.message = {
            type: 'success',
            text: 'Seksjon sletta',
          };
        })
        .catch((err) => (error = err));

      newState.sections = sections.filter((section) => section._id !== payload);

      if (!error) return newState;
    },
    GET_PROJECTS: async () => {
      let projects;
      await axios
        .get('/projects')
        .then((response) => {
          projects = response.data.data.data;
        })
        .catch((err) => err);
      if (projects) return { projects };
    },
    POST_PROJECT: async (globalState, payload) => {
      const newState = {};
      let project;
      await axios
        .post('/projects', payload)
        .then((response) => {
          project = response.data.data.data;
          newState.message = {
            type: 'success',
            text: 'Nytt prosjekt lagret',
          };
        })
        .catch((err) => err);

      newState.projects = [...globalState.projects, project];
      newState.projectDocId = project._id;
      if (project) return newState;
    },
    PATCH_PROJECT: async (globalState, payload) => {
      const newState = {};
      let projects = [...globalState.projects];
      let updatedProject;

      await axios
        .patch(`/projects/${payload.id}`, payload.formData)
        .then((response) => {
          updatedProject = response.data.data.data;
          newState.message = {
            type: 'success',
            text: 'Prosjekt oppdatert',
          };
        })
        .catch((err) => err);

      newState.projects = projects.map((project) => {
        if (project._id === payload.id) {
          return updatedProject;
        } else {
          return project;
        }
      });

      if (updatedProject) return newState;
    },
    DELETE_PROJECT: async (globalState, payload) => {
      const newState = {
        projectDocId: null,
      };
      let projects = [...globalState.projects];
      let error;

      await axios
        .delete(`/projects/${payload}`)
        .then(() => {
          newState.message = {
            type: 'success',
            text: 'Prosjekt sletta',
          };
        })
        .catch((err) => (error = err));

      newState.projects = projects.filter((project) => project._id !== payload);

      if (!error) return newState;
    },
  };

  const actions = {
    SET_MESSAGE: (globalState, payload) => {
      return { message: payload };
    },
    SET_SECTION_DOC_ID: (globalState, payload) => {
      return { sectionDocId: payload };
    },
    SET_PROJECT_DOC_ID: (globalState, payload) => {
      return { projectDocId: payload };
    },
    SET_DISPLAY_MESSAGE: (globalState, payload) => {
      return { displayMessage: payload };
    },
  };

  initStore(asyncActions, actions, {
    user: null,
    sections: null,
    sectionDocId: null,
    projects: null,
    projectDocId: null,
    isLoggedIn: false,
    message: null,
    displayMessage: false,
  });
};

export default configureStore;

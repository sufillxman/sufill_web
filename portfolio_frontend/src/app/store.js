import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectsSlice';
import contactReducer from '../features/contact/contactSlice';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
    contact: contactReducer,
  },
});

export default store;

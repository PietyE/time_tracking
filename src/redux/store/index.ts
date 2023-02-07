import { configureStore, combineReducers } from '@reduxjs/toolkit';

import profile from '../slices/profile';
import vilmates from '../slices/vilmates';
import vilmateSinglePage from '../slices/vilmateSinglePage';
import calendar from '../slices/calendar';
import syncWithGoogleSheets from '../slices/syncWithGoogleSheets';
import projectManagements from '../slices/projectManagements';
import projectReport from '../slices/projectReport';
import timereports from '../slices/timereports';
import mainMenu from '../slices/mainMenu';
import users from '../slices/users';
import developerProjects from '../slices/developerProjects';
import consolidatedReport from '../slices/consolidatedReport';
import projects from '../slices/projects';

const rootReducer = combineReducers({
  profile,
  vilmates,
  vilmateSinglePage,
  calendar,
  syncWithGoogleSheets,
  projectManagements,
  projectReport,
  timereports,
  mainMenu,
  users,
  developerProjects,
  consolidatedReport,
  projects,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.REACT_APP_CUSTOM_NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

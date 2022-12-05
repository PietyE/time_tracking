import { configureStore, combineReducers } from '@reduxjs/toolkit';

import profile from '../slices/profile';
import vilmates from '../slices/vilmates';
import vilmateSinglePage from '../slices/vilmateSinglePage';

const rootReducer = combineReducers({ profile, vilmates, vilmateSinglePage });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.REACT_APP_CUSTOM_NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

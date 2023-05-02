import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import issues from './slice';

export const store = configureStore({
  reducer: { issues },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
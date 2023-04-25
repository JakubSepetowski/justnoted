import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { notesSlice } from './notesSlice';

export const store = configureStore({
	reducer: {
		authentication: authSlice.reducer,
		notes: notesSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './authSlice';
import { notesSlice } from './notesSlice';
import { popupSlice } from './popupSlice';
import { quoteSlice } from './quoteSlice';

export const store = configureStore({
	reducer: {
		authentication: authSlice.reducer,
		notes: notesSlice.reducer,
		popup: popupSlice.reducer,
		quote: quoteSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

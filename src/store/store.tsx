import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { notesSlice } from './slices/notesSlice';
import { popupSlice } from './slices/popupSlice';
import { quoteSlice } from './slices/quoteSlice';
import { homeNotesSlice } from './slices/homeNotesSlice';
import { notePopupSlice } from './slices/notePopupSlice';

export const store = configureStore({
	reducer: {
		authentication: authSlice.reducer,
		notes: notesSlice.reducer,
		popup: popupSlice.reducer,
		quote: quoteSlice.reducer,
		homeNotes: homeNotesSlice.reducer,
		notesPopup: notePopupSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

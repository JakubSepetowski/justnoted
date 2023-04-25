import { createSlice } from '@reduxjs/toolkit';
import { AddActions, InitActions, InitialNoteState, Note } from '../types/types';

const initialState: InitialNoteState = {
	notes: [],
	isFetched: false,
};

export const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		initNotes(state, actions: InitActions) {
			state.notes = actions.payload;
			state.isFetched = true;
		},
		addToNotes(state, actions: AddActions) {
			state.notes.push(actions.payload);
		},
	},
});

import { createSlice } from '@reduxjs/toolkit';
import { AddActions, InitActions, InitialNoteState, Note } from '../types/types';

const initialState: InitialNoteState = {
	notes: [],
	isFetched: false,
};

interface IdActions {
	payload: string;
}
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
		deleteNote(state, actions) {
			const id = actions.payload;
			state.notes = state.notes.filter((note) => note.id !== id);
		},
		toogleToTrash(state, actions: IdActions) {
			const id = actions.payload;
			state.notes = state.notes.map((note) => {
				if (note.id === id) {
					return {
						...note,
						inTrash: !note.inTrash,
					};
				} else {
					return note;
				}
			});
		},
		trashAll(state) {
			state.notes = state.notes.map((note) => {
				return { ...note, inTrash: true };
			});
		},
		changeFavState(state, actions: IdActions) {
			const id = actions.payload;
			state.notes = state.notes.map((note) => {
				if (note.id === id) {
					return {
						...note,
						fav: !note.fav,
					};
				} else {
					return note;
				}
			});
		},
	},
});

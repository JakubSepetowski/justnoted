import { createSlice } from '@reduxjs/toolkit';
import { AddActions, InitActions, InitialNoteState, Note } from '../../types/types';

const initialState: InitialNoteState = {
	notes: [],
	isFetched: false,
};

interface IdActions {
	payload: string;
}

interface UpdateActions {
	payload: Note;
}
interface ChangeColorActions {
	payload: {
		id: string;
		color: string;
	};
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
		updateNote(state, actions: UpdateActions) {
			const id = actions.payload.id;
			state.notes = state.notes.map((note) => {
				if (note.id === id) {
					return {
						...note,
						title: actions.payload.title,
						note: actions.payload.note,
						category: actions.payload.category,
						date: actions.payload.date,
						calendar: actions.payload.calendar,
						fav: actions.payload.fav,
						lastTitle: actions.payload.lastTitle,
						lastNote: actions.payload.lastNote,
						lastCategory: actions.payload.lastCategory,
						lastCalendar: actions.payload.lastCalendar,
						lastDate: actions.payload.lastDate,
						lastFav: actions.payload.lastFav,
						editatedDate: actions.payload.editatedDate,
					};
				} else {
					return note;
				}
			});
		},
		deleteAllTrashedNote(state) {
			state.notes = state.notes.filter((note) => note.inTrash !== true);
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
		changeColor(state, actions: ChangeColorActions) {
			const id = actions.payload.id;
			state.notes = state.notes.map((note) => {
				if (note.id === id) {
					return {
						...note,
						color: actions.payload.color,
					};
				} else {
					return note;
				}
			});
		},
	},
});

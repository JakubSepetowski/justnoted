import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currOpenNoteId: '',
	isOpen: false,
	title: '',
	desc: '',
	color: '',
};
interface openActions {
	payload: {
		currOpenNoteId: string;
		title: string;
		desc: string;
		color: string;
	};
}
interface ChangeColorActions {
	payload: {
		color: string;
	};
}
export const notePopupSlice = createSlice({
	name: 'notePopup',
	initialState,
	reducers: {
		openPopup(state, actions: openActions) {
			state.isOpen = true;
			state.title = actions.payload.title;
			state.desc = actions.payload.desc;
			state.color = actions.payload.color;
			state.currOpenNoteId = actions.payload.currOpenNoteId;
		},
		closePopup(state) {
			state.isOpen = false;
			state.title = '';
			state.desc = '';
			state.color = '';
			state.currOpenNoteId = '';
		},
		changeColor(state, actions: ChangeColorActions) {
			state.color = actions.payload.color;
		},
	},
});

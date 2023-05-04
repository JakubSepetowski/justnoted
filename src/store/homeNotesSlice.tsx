import { createSlice } from '@reduxjs/toolkit';

interface Actions {
	payload: {
		desc: string;
	};
}
interface InitActions {
	payload: {
		id: string;
		importantDesc: string;
		quickDesc: string;
	};
}

const initialState = {
	id: '',
	importantNoteDesc: '',
	quickNoteDesc: '',
	isFetched: false,
};

export const homeNotesSlice = createSlice({
	name: 'quicktNote',
	initialState,
	reducers: {
		initState(state, actions: InitActions) {
			state.id = actions.payload.id;
			state.importantNoteDesc = actions.payload.importantDesc;
			state.quickNoteDesc = actions.payload.quickDesc;
			state.isFetched = true;
		},
		changeImportantDesc(state, actions: Actions) {
			state.importantNoteDesc = actions.payload.desc;
		},
		changeQuickDesc(state, actions: Actions) {
			state.quickNoteDesc = actions.payload.desc;
		},
	},
});

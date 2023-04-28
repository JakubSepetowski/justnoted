import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	message: '',
	isSuccess: true,
};
interface MessageActions {
	payload: {
		message: string;
		success: boolean;
	};
}
export const popupSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		openPopup(state, actions: MessageActions) {
			state.isOpen = true;
			state.message = actions.payload.message;
			if (!actions.payload.success) state.isSuccess = false;
		},
		closePopup(state) {
			state.isOpen = false;
			state.isSuccess = true;
			state.message = '';
		},
	},
});

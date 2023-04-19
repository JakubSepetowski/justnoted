import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: { isAuth: false },
	reducers: {
		setIsAuth(state) {
			state.isAuth = true;
		},
		setIsNotAuth(state) {
			state.isAuth = false;
		},
	},
});

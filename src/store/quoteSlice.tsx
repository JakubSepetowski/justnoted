import { createSlice } from '@reduxjs/toolkit';

interface Actions {
	payload: {
		quote: string;
		author: string;
	};
}

export const quoteSlice = createSlice({
	name: 'quote',
	initialState: { quote: '', author: '' },
	reducers: {
		setQuote(state, actions: Actions) {
			state.quote = actions.payload.quote;
			state.author = actions.payload.author;
		},
	},
});

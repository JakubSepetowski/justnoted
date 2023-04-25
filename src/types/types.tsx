export interface LoginUserData {
	email: string;
	password: string;
}

export interface NewUserData {
	fname: string;
	email: string;
	password: string;
	repeatPassword: string;
}
export interface Note {
	title: string;
	note: string;
	category: string;
	date: string;
	calendar: boolean;
	fav: boolean;
	inTrash?: boolean;
	id?: string;
}
export interface InitialNoteState {
	notes: Note[];
	isFetched: boolean;
}
export interface InitActions {
	payload: Note[];
}
export interface AddActions {
	payload: Note;
}

export enum LoginErrMsgs {
	wrongPassword = 'Firebase: Error (auth/wrong-password).',
	noUser = 'Firebase: Error (auth/user-not-found).',
}

export enum RegisterErrMsgs {
	inUse = 'Firebase: Error (auth/email-already-in-use).',
}

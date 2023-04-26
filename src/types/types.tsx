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
	createdAt: string;
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
export interface PaginateProps {
	notesPerPage: number;
	totalNotes: number;
	currentPage: number;
	onPaginate: (pageNumber: number) => void;
	onPrev: () => void;
	onNext: () => void;
}

export enum LoginErrMsgs {
	wrongPassword = 'Firebase: Error (auth/wrong-password).',
	noUser = 'Firebase: Error (auth/user-not-found).',
}

export enum RegisterErrMsgs {
	inUse = 'Firebase: Error (auth/email-already-in-use).',
}
export enum Sorting {
	category = 'cat',
	fav = 'fav',
	calendar = 'cal',
	latest = 'lat',
	oldest = 'old',
}
export enum SortingOptions {
	latest = '1',
	oldest = '2',
	fav = '3',
	calendar = '4',
	home = 'home',
	shopping = 'shopping',
}

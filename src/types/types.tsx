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
export interface LocalStorage {
	name: string;
	email: string;
	photoURL: string;
	uid: string;
}
export interface FormikValues {
	title: string;
	note: string;
	category: string;
	date: string;
	calendar: boolean;
	fav: boolean;
	color: string;
}
export interface getData extends HomeNotes, Note {}
export interface HomeNotes {
	id: string;
	importantNoteDesc: string;
	quicktNoteDesc: string;
}
export interface Note extends FormikValues {
	createdAt: string;
	inTrash?: boolean;
	id: string;
	editatedDate?: null | string;
	lastTitle?: null | string;
	lastNote?: null | string;
	lastCategory?: null | string;
	lastFav?: null | boolean;
	lastDate?: null | string;
	lastCalendar?: null | boolean;
	lastColor?: null | string;
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
export interface Quote {
	author: string;
	category: string;
	quote: string;
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
	home = 'Home',
	shopping = 'Shopping',
	work = 'Work',
	study = 'Study',
	hobby = 'Hobby',
	finance = 'Finance',
	health = 'Health',
}

export enum HomeNotesNames {
	importantNote = 'importantNote',
	quickNote = 'quickNote',
}

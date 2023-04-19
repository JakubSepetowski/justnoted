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
export enum LoginErrMsgs {
	wrongPassword = 'Firebase: Error (auth/wrong-password).',
	noUser = 'Firebase: Error (auth/user-not-found).',
}

export enum RegisterErrMsgs {
	inUse = 'Firebase: Error (auth/email-already-in-use).',
}

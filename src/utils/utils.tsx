import dayjs from 'dayjs';
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { dataBase, auth } from '../config/firebase';
import { v4 as uuid } from 'uuid';
export const getMonth = (month = dayjs().month()) => {
	const year = dayjs().year();
	const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
	let currentMonthCount = 0 - firstDayOfMonth;
	const daysMatrix = new Array(5).fill([]).map(() => {
		return new Array(7).fill(null).map(() => {
			currentMonthCount++;
			return dayjs(new Date(year, month, currentMonthCount));
		});
	});
	return daysMatrix;
};

export const createCollection = async () => {
	const homeNotesColection = collection(dataBase, `users/${auth.currentUser?.uid}/home`);

	const id = uuid();
	try {
		await setDoc(doc(homeNotesColection, id), {
			id,
			importantNoteDesc: '',
			quicktNoteDesc: '',
		});
	} catch (err) {
		throw new Error();
	}
};

export const stopPropagationHanlder = (e: React.MouseEvent<HTMLDivElement>) => {
	e.stopPropagation();
};

import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/notesSlice';

export const DeleteAllBtn = () => {
	const disptach = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const upadteDataBaseHandler = async () => {
		const q = query(notesColection, where('inTrash', '==', true));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (doc) => {
			await deleteDoc(doc.ref);
		});
		disptach(notesSlice.actions.deleteAllTrashedNote());
	};

	const deleteAllNotesHandler = () => {
		const answer = confirm('Are you sure?');
		if (!answer) return;
		upadteDataBaseHandler();
	};

	return (
		<button
			onClick={deleteAllNotesHandler}
			className='p-1 rounded-md  md:w-auto lg:w-32 w-full mt-2 md:mt-0 md:mr-2 bg-blue-700 text-white  md:rounded-md flex  justify-center items-center'>
			Delete All
		</button>
	);
};

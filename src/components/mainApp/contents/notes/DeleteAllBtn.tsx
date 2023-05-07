import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/slices/notesSlice';
import { popupSlice } from '../../../../store/slices/popupSlice';

interface Props {
	length: number;
}

export const DeleteAllBtn = ({ length }: Props) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const deleteAllNotesHandler = async () => {
		const answer = confirm('Are you sure?');
		if (!answer) return;

		const q = query(notesColection, where('inTrash', '==', true));
		const querySnapshot = await getDocs(q);
		try {
			querySnapshot.forEach(async (doc) => {
				await deleteDoc(doc.ref);
			});
			dispatch(notesSlice.actions.deleteAllTrashedNote());
			dispatch(
				popupSlice.actions.openPopup({ message: 'Removed all from the trash', success: true })
			);
		} catch {
			dispatch(
				popupSlice.actions.openPopup({ message: 'Failed to remove, try again', success: false })
			);
		}
	};

	return (
		<button
			disabled={length === 0}
			onClick={deleteAllNotesHandler}
			className='p-1 rounded-md  md:w-auto lg:w-32 w-full mt-2 md:mt-0 md:mr-2 bg-blue-700 text-white  md:rounded-md flex  justify-center items-center duration-200 transition-colors hover:bg-blue-600'>
			Delete All
		</button>
	);
};

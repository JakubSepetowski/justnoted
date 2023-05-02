import { collection, updateDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/notesSlice';
import { RootState } from '../../../../store/store';
import { popupSlice } from '../../../../store/popupSlice';

interface Props {
	length: number;
}

export const DeafultNotesContentBtns = ({ length }: Props) => {
	const dispatch = useDispatch();
	const notes = useSelector((state: RootState) => state.notes.notes);
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const trashAllHandler = () => {
		try {
			notes.forEach(async (note) => {
				await updateDoc(doc(notesColection, note.id), { inTrash: true });
			});
			dispatch(notesSlice.actions.trashAll());
			dispatch(
				popupSlice.actions.openPopup({ message: 'Added all notes to trash', success: true })
			);
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to add all notes to trash, try again',
					success: false,
				})
			);
		}
	};

	return (
		<div className=' flex mt-2 md:mt-0 '>
			<Link
				to='/app/new'
				className='p-1 md:w-auto lg:w-32 w-full md:mr-2 bg-blue-700 text-white rounded-l-md md:rounded-md flex  justify-center items-center duration-200 transition-colors hover:bg-blue-600'>
				Add new
			</Link>
			<button
				disabled={length === 0}
				onClick={trashAllHandler}
				className='p-1 md:w-auto lg:w-32 w-full border rounded-r-md md:rounded-md bg-transparent hover:bg-neutral-200 duration-200 transition-colors'>
				Trash all
			</button>
		</div>
	);
};

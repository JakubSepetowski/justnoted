import { collection, updateDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/notesSlice';
import { RootState } from '../../../../store/store';

export const DeafultBtns = () => {
	const disptach = useDispatch();
	const notes = useSelector((state: RootState) => state.notes.notes);
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const trashAllHandler = () => {
		notes.forEach(async (note) => {
			await updateDoc(doc(notesColection, note.id), { inTrash: true });
		});
		disptach(notesSlice.actions.trashAll());
	};

	return (
		<div className=' flex mt-2 md:mt-0 '>
			<Link
				to='/app/new'
				className='p-1 md:w-auto lg:w-32 w-full md:mr-2 bg-blue-700 text-white rounded-l-md md:rounded-md flex  justify-center items-center'>
				Add new
			</Link>
			<button
				onClick={trashAllHandler}
				className='p-1 md:w-auto lg:w-32 w-full border rounded-r-md md:rounded-md'>
				Trash all
			</button>
		</div>
	);
};

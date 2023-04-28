import { collection, doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/notesSlice';

interface Props {
	id: string;
}

export const DeafultNoteBtns = ({ id }: Props) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const upadateTrashHandler = async () => {
		await updateDoc(doc(notesColection, id), { inTrash: true });
	};
	const addToTrashHandler = () => {
		upadateTrashHandler();
		dispatch(notesSlice.actions.toogleToTrash(id));
	};
	return (
		<div className='flex'>
			<Link
				to={`/app/notes/note/${id}`}
				className='bg-blue-700 text-white p-1 pl-2 pr-2 rounded-md min-w-0 flex justify-center items-center'>
				Details
			</Link>

			<button onClick={addToTrashHandler} className='ml-2 border  p-1 rounded-md min-w-0 pl-2 pr-2'>
				Add to trash
			</button>
		</div>
	);
};

import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/notesSlice';
interface Props {
	id: string;
}
export const TrashNoteBtns = ({ id }: Props) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const deleteNoteHandler = async () => {
		await deleteDoc(doc(notesColection, id));
		dispatch(notesSlice.actions.deleteNote(id));
	};
	const removeFromTrashHandler = async () => {
		await updateDoc(doc(notesColection, id), { inTrash: false });
		dispatch(notesSlice.actions.toogleToTrash(id));
	};
	return (
		<div className='flex'>
			<button
				onClick={deleteNoteHandler}
				className='bg-blue-700 text-white p-1 pl-2 pr-2 rounded-md min-w-0 flex justify-center items-center'>
				Delete
			</button>

			<button
				onClick={removeFromTrashHandler}
				className='ml-2 border  p-1 rounded-md min-w-0 pl-2 pr-2'>
				Undo
			</button>
		</div>
	);
};

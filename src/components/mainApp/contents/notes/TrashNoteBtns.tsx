import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/notesSlice';
import { popupSlice } from '../../../../store/popupSlice';
interface Props {
	id: string;
}
export const TrashNoteBtns = ({ id }: Props) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const deleteNoteHandler = async () => {
		try {
			await deleteDoc(doc(notesColection, id));
			dispatch(notesSlice.actions.deleteNote(id));
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Note has been removed successfully',
					success: true,
				})
			);
		} catch {
			dispatch(
				popupSlice.actions.openPopup({ message: 'Failed to remove, try again', success: false })
			);
		}
	};
	const removeFromTrashHandler = async () => {
		try {
			await updateDoc(doc(notesColection, id), { inTrash: false });
			dispatch(notesSlice.actions.toogleToTrash(id));
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Note has been restored',
					success: true,
				})
			);
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to restore a note, try again',
					success: false,
				})
			);
		}
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

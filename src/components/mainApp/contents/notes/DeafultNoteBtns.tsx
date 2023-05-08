import { collection, doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/slices/notesSlice';
import { popupSlice } from '../../../../store/slices/popupSlice';

interface Props {
	id: string;
	color:string
}

export const DeafultNoteBtns = ({ id,color }: Props) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const addToTrashHandler = async () => {
		try {
			await updateDoc(doc(notesColection, id), { inTrash: true });
			dispatch(notesSlice.actions.toogleToTrash(id));
			dispatch(popupSlice.actions.openPopup({ message: 'Added note to trash', success: true }));
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to add to trash, try again',
					success: false,
				})
			);
		}
	};
	

	return (
		<div className='flex'>
			<Link
				to={`/app/notes/note/${id}`}
				className={`${color} hover:scale-[1.02] text-white p-1 pl-2 pr-2 rounded-md min-w-0 flex justify-center items-center duration-200 transition-transform`}>
				Details
			</Link>

			<button
				onClick={addToTrashHandler}
				className='ml-2 border  p-1 rounded-md min-w-0 pl-2 pr-2 bg-transparent hover:bg-neutral-200 duration-200 transition-colors'>
				Add to trash
			</button>
		</div>
	);
};

import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { dataBase, auth } from '../../../../config/firebase';
import { notesSlice } from '../../../../store/slices/notesSlice';
import { popupSlice } from '../../../../store/slices/popupSlice';
import { stopPropagationHanlder } from '../../../../utils/utils';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { opacityAnim } from '../../../../animations/animations';

interface Props {
	onClosePopup: () => void;
	onReset: () => void;
}

export const DeleteAllPopup = ({ onClosePopup, onReset }: Props) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const [isDeleting, setIsDeleting] = useState(false);

	const closePopupHandler = () => {
		onClosePopup();
	};

	const deleteAllNotesHandler = async () => {
		setIsDeleting(true);
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
		setIsDeleting(false);
		onReset();
	};

	return (
		<div onClick={closePopupHandler} className='absolute top-0 left-0 h-full w-full'>
			<motion.div
				key='deleteAllPopup'
				variants={opacityAnim}
				initial='hidden'
				animate='visible'
				exit='exit'
				onClick={stopPropagationHanlder}
				className='absolute top-5 left-1/2 translate-x-[-50%] p-4 min-h-0 w-full md:w-1/3 bg-white shadow-lg rounded-md flex items-center flex-col'>
				<p>
					Are you sure? All notes in the trash will be irretrievably deleted. This cannot be undone.
				</p>
				<div className='flex mt-5 self-start'>
					{!isDeleting && (
						<>
							<button
								onClick={deleteAllNotesHandler}
								className='bg-blue-700 hover:bg-blue-600 text-white p-1 pl-2 pr-2 rounded-md min-w-0 flex justify-center items-center duration-200 transition-colors'>
								Yes
							</button>
							<button
								onClick={closePopupHandler}
								className='ml-2 border  p-1 rounded-md min-w-0 pl-2 pr-2 bg-transparent hover:bg-neutral-200 duration-200 transition-colors'>
								Cancel
							</button>
						</>
					)}
					{isDeleting && <p>Notes are deleting please wait</p>}
				</div>
			</motion.div>
		</div>
	);
};

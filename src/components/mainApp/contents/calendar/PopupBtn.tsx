import { useDispatch } from 'react-redux';
import checkMark from '../../../../assets/svg/checkMark.svg';
import { notePopupSlice } from '../../../../store/slices/notePopupSlice';
import { notesSlice } from '../../../../store/slices/notesSlice';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { dataBase, auth } from '../../../../config/firebase';
import { popupSlice } from '../../../../store/slices/popupSlice';

interface Props {
	color: string;
	currColor: string;
	id: string;
}

export const PopupBtn = ({ color, currColor, id }: Props) => {
	const dispatch = useDispatch();

	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const changeColorHandler = async () => {
		dispatch(notesSlice.actions.changeColor({ id, color }));
		dispatch(notePopupSlice.actions.changeColor({ color }));
		try {
			await updateDoc(doc(notesColection, id), { color: color });
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to changed color, try again',
					success: false,
				})
			);
		}
	};

	return (
		<button
			onClick={changeColorHandler}
			className={`${color} ${color}-hover transition-colors duration-200  w-5 h-5 rounded-full flex justify-center items-center`}>
			{currColor === color && (
				<img className='w-2/3' src={checkMark} alt='currently selected color'></img>
			)}
		</button>
	);
};

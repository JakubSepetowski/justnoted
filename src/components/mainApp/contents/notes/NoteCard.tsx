import { Link } from 'react-router-dom';
import { Note } from '../../../../types/types';
import favBlack from '../../../../assets/svg/fav-black.svg';
import favBlue from '../../../../assets/svg/fav-blue.svg';
import { useDispatch } from 'react-redux';
import { notesSlice } from '../../../../store/notesSlice';
import { collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { dataBase, auth } from '../../../../config/firebase';

export const NoteCrad = (props: Note) => {
	const dispatch = useDispatch();
	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);
	const today = new Date();
	const createdAt = new Date(`${props.createdAt}T00:00:00`);
	const diffTime = Math.abs(today.getTime() - createdAt.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

	const upadateFavHandler = async () => {
		await updateDoc(doc(notesColection, props.id), { fav: !props.fav });
	};
	const upadateTrashHandler = async () => {
		await updateDoc(doc(notesColection, props.id), { inTrash: true });
	};
	// const delateFromDataBaseHanlder = async () => {
	// 	const noteRef = doc(notesColection, props.id);
	// 	await deleteDoc(noteRef);
	// };

	const addToTrashHandler = () => {
		upadateTrashHandler();
		dispatch(notesSlice.actions.toogleToTrash(props.id));
	};
	const changeFavStateHanlder = () => {
		upadateFavHandler();
		dispatch(notesSlice.actions.changeFavState(props.id));
	};

	const setDay = (diffDays: number) => {
		switch (true) {
			case diffDays === 0:
				return 'Today';
			case diffDays === 1:
				return 'Yesterday';
			case diffDays >= 2 && diffDays <= 30:
				return `${diffDays} days ago`;
			case diffDays > 30 && diffDays < 365:
				const months = Math.floor(diffDays / 30);
				return `${months} months ago`;
			default:
				const years = Math.floor(diffDays / 365);
				return `${years} years ago`;
		}
	};

	const daysAgo = setDay(diffDays);
	return (
		<div
			id={props.id}
			className='p-4 shadow-md rounded-md bg-white w-full flex flex-col justify-between text-sm md:text-base h-2/3 md:h-2/5 md:w-2/5  lg:w-5/12  '>
			<div className='flex justify-between items-center border-b pb-3 '>
				<div>
					<h3>{props.title}</h3>
					<h4>{props.category}</h4>
				</div>

				{props.fav && (
					<button onClick={changeFavStateHanlder}>
						<img className='w-4 md:w-5 ' src={favBlue} alt='favourite note icon' />
					</button>
				)}
				{!props.fav && (
					<button onClick={changeFavStateHanlder}>
						<img className='w-4 md:w-5 ' src={favBlack} alt='normal note icon' />{' '}
					</button>
				)}
			</div>

			<div className='border-b h-48 mt-2 mb-2  noscroll flex items-center   overflow-y-scroll text-xs md:text-sm '>
				<p>{props.note}</p>
			</div>
			<div className='flex mt-3 justify-between items-center'>
				<div className='flex'>
					<Link
						to={`/app/notes/note/${props.id}`}
						className='bg-blue-700 text-white p-1 pl-2 pr-2 rounded-md min-w-0 flex justify-center items-center'>
						Details
					</Link>

					<button
						onClick={addToTrashHandler}
						className='ml-2 border  p-1 rounded-md min-w-0 pl-2 pr-2'>
						Add to trash
					</button>
				</div>
				<p className='text-xs text-gray-400'>{daysAgo}</p>
			</div>
		</div>
	);
};

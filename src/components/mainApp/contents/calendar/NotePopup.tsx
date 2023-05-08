import { useDispatch, useSelector } from 'react-redux';
import { PopupBtn } from './PopupBtn';
import { RootState } from '../../../../store/store';
import { notePopupSlice } from '../../../../store/slices/notePopupSlice';
import { opacityAnim, fromBottomAnim, fromLeftAnim } from '../../../../animations/animations';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const NotePopup = () => {
	const dispatch = useDispatch();
	const title = useSelector((state: RootState) => state.notesPopup.title);
	const desc = useSelector((state: RootState) => state.notesPopup.desc);
	const currColor = useSelector((state: RootState) => state.notesPopup.color);
	const id = useSelector((state: RootState) => state.notesPopup.currOpenNoteId);
	const colors = ['blue', 'indigo', 'purple', 'green', 'red', 'orange', 'yellow'];

	const closePopupHandler = () => {
		dispatch(notePopupSlice.actions.closePopup());
	};

	return (
		<motion.div
			key='notePopup'
			variants={opacityAnim}
			initial='hidden'
			animate='visible'
			exit='exit'
			className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-md shadow-2xl border  min-h-0 min-w-0 max-w-md flex flex-col items-center overflow-hidden text-sm md:text-base '>
			<motion.div
				variants={fromLeftAnim}
				className={`${currColor} transition-colors duration-200 h-12 w-full flex justify-between items-center p-4 text-white`}>
				<p className='font-semibold'>Your note</p>
				<button onClick={closePopupHandler}>Close</button>
			</motion.div>
			<div className='flex flex-col h-full w-full p-4 mt-4  bg-r'>
				<motion.p variants={fromBottomAnim} className='border-b pb-1 w-2/3 border-gray-400'>
					{title}
				</motion.p>
				<motion.p variants={fromBottomAnim} className='mt-4'>
					{desc}
				</motion.p>
				<motion.div variants={fromBottomAnim} className='mt-4'>
					<Link to={`/app/notes/note/${id}`} className='font-semibold'>
						more info
					</Link>
				</motion.div>
				<motion.div variants={fromLeftAnim} className='flex gap-2 mt-8 mb-4'>
					{colors.map((color) => (
						<PopupBtn key={color} color={color} currColor={currColor} id={id} />
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};

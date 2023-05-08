import { useDispatch } from 'react-redux';
import { notePopupSlice } from '../../../../store/slices/notePopupSlice';
import { motion } from 'framer-motion';
import { opacityAnim } from '../../../../animations/animations';

interface Props {
	title: string;
	id: string;
	color: string;
	note: string;
}

export const CalendarNote = ({ title, id, color, note }: Props) => {
	const dispatch = useDispatch();
	const openPopupHandler = () => {
		dispatch(
			notePopupSlice.actions.openPopup({
				title,
				desc: note,
				color,
				currOpenNoteId: id,
			})
		);
	};

	return (
		<motion.div
			key={id}
			variants={opacityAnim}
			initial='hidden'
			animate='visible'
			exit='exit'
			onClick={openPopupHandler}
			className={`rounded-md w-full md:w-11/12 md:mx-auto cursor-pointer ${color} ${color}-hover transition-colors text-sm duration-200  hover:bg-opacity-80 text-white p-2  md:p-1  md:text-xs mt-1`}>
			<h4 className='overflow-x-auto noscroll'>{title}</h4>
		</motion.div>
	);
};

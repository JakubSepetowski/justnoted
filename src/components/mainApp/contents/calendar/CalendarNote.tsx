import { useDispatch } from 'react-redux';
import { notePopupSlice } from '../../../../store/slices/notePopupSlice';

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
		<div
			onClick={openPopupHandler}
			className={`rounded-md w-full md:w-11/12 md:mx-auto cursor-pointer bg-${color}-500 text-sm duration-200 transition-colors hover:bg-opacity-80 text-white p-2  md:p-1  md:text-xs mt-1`}>
			<h3 className='overflow-x-auto noscroll'>{title}</h3>
		</div>
	);
};

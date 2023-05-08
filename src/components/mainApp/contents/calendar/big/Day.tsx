import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useEffect, useState } from 'react';
import { Note } from '../../../../../types/types';
import { CalendarNote } from '../CalendarNote';
import { AnimatePresence } from 'framer-motion';

interface Props {
	day: Dayjs;
	rowIdx: number;
}
export const Day = ({ day, rowIdx }: Props) => {
	const notes = useSelector((state: RootState) => state.notes.notes);
	const [dayNotes, setDayNotes] = useState<Note[]>([]);

	useEffect(() => {
		const filteredNotes = notes.filter(
			(note) => note.calendar && !note.inTrash && note.date === day.format('YYYY-MM-DD')
		);
		setDayNotes(filteredNotes);
	}, [notes, day]);

	return (
		<div
			className={`border border-gray-300 flex flex-col overflow-y-auto noscroll  ${
				day.format('ddd') === 'Sat' || day.format('ddd') === 'Sun' ? 'bg-neutral-200 ' : ''
			}`}>
			<div className='flex flex-col   items-center'>
				{rowIdx === 0 && (
					<p className='text-sm mt-1 font-semibold'>{day.format('ddd').toUpperCase()}</p>
				)}
				<p
					className={`text-sm p-1 mt-1 text-center ${
						day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
							? 'transition-colors duration-200 bg-blue-700 text-white w-7 rounded-full'
							: ''
					}`}>
					{day.format('DD')}
				</p>
			</div>
			<AnimatePresence>
				{dayNotes.map((note) => (
					<CalendarNote
						key={note.id}
						id={note.id}
						title={note.title}
						color={note.color!}
						note={note.note}
					/>
				))}
			</AnimatePresence>
		</div>
	);
};

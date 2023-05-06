import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { currentDate } from '../../common/date';
import { MobileCalendarNote } from './MobileCalendarNote';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { H2 } from '../../common/H2';

export const MobileCalendar = () => {
	const notes = useSelector((state: RootState) => state.notes.notes);
	const [pickedData, setPikcedData] = useState(currentDate);
	const filter = notes.filter((note) => note.calendar && note.date === pickedData);
	const [filteredNotes, setFilteredNotes] = useState(filter);
	const [year, month, day] = pickedData.split('-');
	useEffect(() => {
		setFilteredNotes(filter);
	}, [pickedData]);

	const changeDateHandler = (e: any) => {
		setPikcedData(e.target.value);
	};
	return (
		<div className='sm:hidden w-full h-full flex flex-col justify-center items-center'>
			<H2 title='Your Calendar' />
			<div
				className={`bg-white shadow-md rounded-md w-full  flex flex-col mt-4 mb-4 overflow-hidden ${
					filteredNotes.length === 0 ? 'h-1/3' : 'h-3/5'
				}`}>
				<div className='bg-blue-700 h-20 p-2 flex justify-between items-center'>
					<p className='text-white text-lg'>
						{day} {month} {year}
					</p>
					<input
						type='date'
						className='w-[20px] bg-none'
						onChange={changeDateHandler}
						defaultValue={currentDate}
					/>
				</div>
				<div className='h-full mt-10 w-10/12 mx-auto flex flex-col gap-4 overflow-y-auto'>
					{filteredNotes.length > 0 &&
						filteredNotes.map((note) => (
							<MobileCalendarNote key={note.id} title={note.title} id={note.id} fav={note.fav} />
						))}
					{filteredNotes.length === 0 && <p>No note for this day</p>}
				</div>
			</div>
			<Link to='/app/new' className='w-full text-center bg-blue-700 text-white p-2 rounded-md'>
				add new note
			</Link>
		</div>
	);
};

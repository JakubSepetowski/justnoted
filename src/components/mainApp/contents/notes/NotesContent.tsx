import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ContentWrapper } from '../../common/ContentWrapper';
import { NoteCrad } from './NoteCard';
import { Empty } from './Empty';
import { Link } from 'react-router-dom';

export const NotesContent = () => {
	const notes = useSelector((state: RootState) => state.notes.notes);
	return (
		<ContentWrapper hasHeader={false}>
			<div className=' h-full flex flex-col '>
				<div className='md:h-1/6  pt-8 md:pt-0 md:p-0  w-full flex flex-col md:flex-row items-center md:justify-around '>
					<h2 className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>Your Notes</h2>
					<div className='flex flex-col md:flex-row w-full md:w-auto text-sm lg:text-base'>
						<input
							placeholder='Search notes by title'
							className='w-full p-1 mt-2 md:mt-0 md:mr-2 md:w-32 lg:w-52 rounded-md'
							type='text'
						/>
						<select
							className='w-full p-1 md:w-24 lg:w-36 mt-2 md:mt-0 md:mr-4 lg:mr-8 rounded-md'
							name='filter'>
							<option value='0'>Sort by</option>
							<option value='1'>The lates</option>
							<option value='2'>From the oldest</option>
							<option value='3'>Favourites</option>
							<option value='4'>Save in calendar</option>
						</select>
						<div className=' flex mt-2 md:mt-0 '>
							<Link
								to='/app/new'
								className='p-1 md:w-auto lg:w-32 w-full md:mr-2 bg-blue-700 text-white rounded-l-md md:rounded-md flex  justify-center items-center'>
								Add new
							</Link>
							<button className='p-1 md:w-auto lg:w-32 w-full border rounded-r-md md:rounded-md'>
								Delete all
							</button>
						</div>
					</div>
				</div>
				<div className='h-4/6 md:h-5/6 w-full flex flex-col justify-between'>
					<div className=' h-full flex flex-col md:flex-row justify-center md:items-center flex-wrap gap-5 overflow-scroll noscroll '>
						{notes.length === 0 && <Empty />}
						{notes.map(
							(note) =>
								!note.inTrash && (
									<NoteCrad
										key={note.id}
										title={note.title}
										category={note.category}
										note={note.note}
										date={note.date}
										id={note.id}
										fav={note.fav}
										calendar={note.calendar}
									/>
								)
						)}
					</div>
					{notes.length > 4 && (
						<div className='w-full flex justify-center'>
							<button>left</button>
							<button className='ml-4'>right</button>
						</div>
					)}
				</div>
			</div>
		</ContentWrapper>
	);
};

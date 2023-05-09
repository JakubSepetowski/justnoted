import { Link } from 'react-router-dom';
import { InfoItem } from './InfoItem';
import { Note } from '../../../../types/types';


interface Props {
	noteInfo: Note;
	onOpenEdit: () => void;
}

export const NoteInfo = ({ noteInfo, onOpenEdit }: Props) => {
	
	return (
		<>
			<div className='flex  h-4/5 flex-col justify-between '>
				<div>
					<InfoItem spanText='Date of creating' desc={noteInfo.createdAt} addMarign={false} />
					<InfoItem spanText='Title' desc={noteInfo.title} addMarign={true} />
				</div>
				<div>
					<InfoItem spanText='Note' desc={noteInfo.note} addMarign={false} />
				</div>
				<div>
					<InfoItem spanText='Category' desc={noteInfo.category} addMarign={false} />
					<InfoItem spanText='Favourite' desc={noteInfo.fav ? 'yes' : 'no'} addMarign={true} />
					<InfoItem
						spanText='Saved in calendar'
						desc={noteInfo.calendar ? `${noteInfo.date}` : 'no'}
						addMarign={true}
					/>
					<div className='mt-1 flex items-center'>
						<p className='font-semibold'>Picked color:</p>
						<div className={` ml-1 ${noteInfo.color} w-5 h-5 rounded-full`}></div>
					</div>
				</div>
			</div>
			<div className='flex'>
				<Link
					to='/app/notes'
					className={`${noteInfo.color} hover:scale-[1.02] text-white p-1 pl-2 pr-2 rounded-md min-w-0 flex justify-center items-center duration-200 transition-transform`}>
					Back to all notes
				</Link>
				<button
					onClick={onOpenEdit}
					className='ml-2 border  p-1 rounded-md min-w-0 pl-2 pr-2 bg-transparent hover:bg-neutral-200 duration-200 transition-colors'>
					Edit note
				</button>
			</div>
		</>
	);
};

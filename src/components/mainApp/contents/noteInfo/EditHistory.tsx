import { Player } from '@lottiefiles/react-lottie-player';
import { Note } from '../../../../types/types';
import noEdit from '../../../../assets/lotties/noEdit.json';
import { HistoryItem } from './HistoryItem';


interface Props {
	noteInfo: Note;
}

export const EditHistory = ({ noteInfo }: Props) => {
	return (
		<div className=' h-52 md:h-[18rem] lg:min-h-[23rem] bg-transparent w-full mt-12  bg-white shadow-md rounded-md p-4 overflow-y-auto mb-4 lg:mb-0 '>
			{!noteInfo.editatedDate && (
				<div className='h-full w-full flex flex-col items-center justify-center'>
					<p className={`lg:text-lg font-semibold ${noteInfo.color}-text text-center mb-4`}>
						This note hasn't been edited yet.
					</p>
					<Player src={noEdit} className='hidden md:block md:w-1/4 lg:w-2/3' loop autoplay />
				</div>
			)}
			{noteInfo.editatedDate && (
				<>
					<p>
						<span className='font-semibold'>Last edit was on: </span>
						{noteInfo.editatedDate}
					</p>
					<p className={`mt-6 font-bold ${noteInfo.color}-text  mb-6`}>The following changes have been made</p>
					{noteInfo.lastTitle !== noteInfo.title && (
						<HistoryItem name='Title:' color={noteInfo.color!} oldValue={noteInfo.lastTitle!} newValue={noteInfo.title} />
					)}
					{noteInfo.lastNote !== noteInfo.note && (
						<HistoryItem name='Note:' color={noteInfo.color!} oldValue={noteInfo.lastNote!} newValue={noteInfo.note} />
					)}
					{noteInfo.lastCategory !== noteInfo.category && (
						<HistoryItem
							name='Category:' color={noteInfo.color!}
							oldValue={noteInfo.lastCategory!}
							newValue={noteInfo.category}
						/>
					)}
					{noteInfo.calendar && noteInfo.lastDate !== noteInfo.date && (
						<HistoryItem
							name='Date in calendar:' color={noteInfo.color!}
							oldValue={noteInfo.lastDate!}
							newValue={noteInfo.date}
						/>
					)}
					{noteInfo.lastCalendar !== noteInfo.calendar && noteInfo.calendar && (
						<p className='mt-2 font-semibold'>
							Calendar:{' '}
							<span className={`${noteInfo.color}-text`}>Note was added to calendar on {noteInfo.date}</span>
						</p>
					)}
					{noteInfo.lastCalendar !== noteInfo.calendar && !noteInfo.calendar && (
						<p className='mt-2 font-semibold'>
							Calendar: <span className={`${noteInfo.color}-text`}>Note was removed from the calendar</span>
						</p>
					)}
					{noteInfo.lastFav !== noteInfo.fav && noteInfo.fav && (
						<p className='mt-2 font-semibold'>
							Favourite: <span className={`${noteInfo.color}-text`}>Note was marked as favourite</span>
						</p>
					)}
					{noteInfo.lastFav !== noteInfo.fav && !noteInfo.fav && (
						<p className='mt-2 font-semibold'>
							Favourite:
							<span className={`${noteInfo.color}-text`}> Note was removed from favourties</span>
						</p>
					)}
				</>
			)}
		</div>
	);
};

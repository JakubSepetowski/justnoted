import { Player } from '@lottiefiles/react-lottie-player';
import { Note } from '../../../../types/types';
import noEdit from '../../../../assets/lotties/noEdit.json';
import { HistoryItem } from './HistoryItem';

interface Props {
	noteInfo: Note;
	newColor: string;
}

export const EditHistory = ({ noteInfo, newColor }: Props) => {
	const currColor = newColor ? newColor : noteInfo.color;

	return (
		<div className=' h-52 md:h-[18rem] lg:min-h-[23rem] bg-transparent w-full mt-12  bg-white shadow-md rounded-md p-4 overflow-y-auto mb-4 lg:mb-0 '>
			{!noteInfo.editatedDate && (
				<div className='h-full w-full flex flex-col items-center justify-center'>
					<p className={`lg:text-lg font-semibold ${currColor}-text text-center mb-4`}>
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
					<p className={`mt-6 font-bold ${currColor}-text  mb-6`}>
						The following changes have been made
					</p>
					{noteInfo.lastTitle !== noteInfo.title && (
						<HistoryItem
							name='Title:'
							color={currColor}
							oldValue={noteInfo.lastTitle!}
							newValue={noteInfo.title}
						/>
					)}
					{noteInfo.lastNote !== noteInfo.note && (
						<HistoryItem
							name='Note:'
							color={currColor}
							oldValue={noteInfo.lastNote!}
							newValue={noteInfo.note}
						/>
					)}
					{noteInfo.lastCategory !== noteInfo.category && (
						<HistoryItem
							name='Category:'
							color={currColor}
							oldValue={noteInfo.lastCategory!}
							newValue={noteInfo.category}
						/>
					)}
					{noteInfo.calendar && noteInfo.lastDate !== noteInfo.date && (
						<HistoryItem
							name='Date in calendar:'
							color={currColor}
							oldValue={noteInfo.lastDate!}
							newValue={noteInfo.date}
						/>
					)}
					{noteInfo.lastCalendar !== noteInfo.calendar && noteInfo.calendar && (
						<p className='mt-2 font-semibold'>
							Calendar:{' '}
							<span className={`${currColor}-text`}>
								Note was added to calendar on {noteInfo.date}
							</span>
						</p>
					)}
					{noteInfo.lastCalendar !== noteInfo.calendar && !noteInfo.calendar && (
						<p className='mt-2 font-semibold'>
							Calendar:{' '}
							<span className={`${currColor}-text`}>Note was removed from the calendar</span>
						</p>
					)}
					{noteInfo.lastFav !== noteInfo.fav && noteInfo.fav && (
						<p className='mt-2 font-semibold'>
							Favourite: <span className={`${currColor}-text`}>Note was marked as favourite</span>
						</p>
					)}
					{noteInfo.lastFav !== noteInfo.fav && !noteInfo.fav && (
						<p className='mt-2 font-semibold'>
							Favourite:
							<span className={`${currColor}-text`}> Note was removed from favourties</span>
						</p>
					)}
					{noteInfo.lastColor !== noteInfo.color && (
						<HistoryItem
							name='Color of note'
							color={currColor}
							oldValue={noteInfo.lastColor!}
							newValue={noteInfo.color}
						/>
					)}
				</>
			)}
		</div>
	);
};

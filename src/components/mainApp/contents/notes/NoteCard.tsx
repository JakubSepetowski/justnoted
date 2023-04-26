import { Note } from '../../../../types/types';

export const NoteCrad = (props: Note) => {
	const today = new Date();
	const createdAt = new Date(`${props.createdAt}T00:00:00`);
	const diffTime = Math.abs(today.getTime() - createdAt.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;

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
			className='p-4 shadow-md rounded-md bg-white w-full h-2/3 md:h-2/5 md:w-2/5  lg:w-5/12 flex flex-col justify-between text-sm md:text-base'>
			<div className='flex justify-between items-center border-b pb-3 '>
				<div>
					<h3>{props.title}</h3>
					<h4>{props.category}</h4>
				</div>
				{props.fav && <button>Ulubiony</button>}
				{!props.fav && <button>nie</button>}
			</div>
			<p className='border-b h-48 mt-2  noscroll flex items-center  overflow-y-scroll text-xs md:text-sm'>
				{props.note}
			</p>
			<div className='flex mt-3 justify-between items-center'>
				<div className='flex'>
					<button className='bg-blue-700 text-white p-1 rounded-md w-16 md:w-20'>details</button>
					<button className='ml-2 border  p-1 rounded-md w-16 md:w-20 '>delete</button>
				</div>
				<p className='text-xs text-gray-400'>{daysAgo}</p>
			</div>
		</div>
	);
};

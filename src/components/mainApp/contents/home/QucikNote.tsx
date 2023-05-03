import pinned from '../../../../assets/svg/pinned.svg';
import { CardHeader } from './CardHeader';

export const QucikNote = () => {
	const editCardHandler = () => {
		console.log('ok');
	};
	return (
		<div className='bg-white rounded-md h-96  md:h-full overflow-y-auto p-4 border flex flex-col  w-full text-sm md:text-base relative'>
			<CardHeader title='Quick note' info='cos tu wymysl' titleImg={pinned} onClick={editCardHandler} />
			<div className='h-full pt-4 pb-4 flex justify-center items-center'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias laboriosam non voluptatum
				inventore quasi dolor dignissimos aperiam fugit quaerat quia quidem ab, cupiditate illo
			</div>
		</div>
	);
};

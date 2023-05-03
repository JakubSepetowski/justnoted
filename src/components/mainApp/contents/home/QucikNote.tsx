import pinned from '../../../../assets/svg/pinned.svg';
import { CardHeader } from './CardHeader';

export const QucikNote = () => {
	const editCardHandler = () => {
		console.log('ok');
	};
	return (
		<div className='bg-white rounded-md h-56  md:h-full overflow-y-auto p-4 border flex flex-col  w-full'>
			<CardHeader title='Quick note' titleImg={pinned} onClick={editCardHandler} />
			<div className='h-full pt-4'></div>
		</div>
	);
};

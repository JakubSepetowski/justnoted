import { CardHeader } from './CardHeader';
import tasks from '../../../../assets/svg/tasks.svg';

export const Habbits = () => {
	const editCardHandler = () => {
		console.log('ok');
	};
	return (
		<div className='bg-white rounded-md  w-full  md:w-3/5 h-full p-4 border'>
			<CardHeader title='Habbits' titleImg={tasks} onClick={editCardHandler} />
			<div className='h-full pt-4'></div>
		</div>
	);
};

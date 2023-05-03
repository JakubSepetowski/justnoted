import { CardHeader } from './CardHeader';
import tasks from '../../../../assets/svg/tasks.svg';

export const Habbits = () => {
	const editCardHandler = () => {
		console.log('ok');
	};
	return (
		<div className='bg-white rounded-md  w-full overflow-y-auto  md:w-3/5 h-full p-4 border text-sm md:text-base relative'>
			<CardHeader
				title='Habbits 0/5'
				info='Add your daily tasks, each day progress will be reset'
				titleImg={tasks}
				onClick={editCardHandler}
			/>

			<ul className='pt-4'>
				<li>
					* drink 2l of water <button>D</button>
				</li>
				<li>* go for a walk</li>
				<li>* make one note</li>
				<li>* make one note</li>
				<li>* make one note</li>
			</ul>
		</div>
	);
};

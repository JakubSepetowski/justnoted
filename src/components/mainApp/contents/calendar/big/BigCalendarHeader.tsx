import { H2 } from '../../../../common/H2';
import arrowLeft from '../../../../../assets/svg/arrowLeft.svg';
import arrowRight from '../../../../../assets/svg/arrowRight.svg';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fromRigthAnim } from '../../../../../animations/animations';

interface Props {
	monthIndex: number;
	onNextOrPrevMonthHandler: (change: string) => void;
	onResetMonth: () => void;
}

export const BigCalendarHeader = ({
	monthIndex,
	onNextOrPrevMonthHandler,
	onResetMonth,
}: Props) => {
	const nextMonthHandler = () => {
		onNextOrPrevMonthHandler('next');
	};
	const prevMonthHandler = () => {
		onNextOrPrevMonthHandler('prev');
	};

	return (
		<header className='h-20 bg-blue-700 text-white p-4 flex items-center'>
			<H2 title='Calendar' />

			<motion.div variants={fromRigthAnim} className='flex justify-center items-center'>
				<Link
					to='/app/new'
					className='border p-2 ml-8 min-w-[6rem] rounded-md hover:bg-blue-600  duration-200 transition-colors'>
					Add new note
				</Link>

				<button
					onClick={onResetMonth}
					className='ml-4 border p-2 rounded-md min-w-[6rem] hover:bg-blue-600  duration-200 transition-colors'>
					Today
				</button>
				<button
					onClick={prevMonthHandler}
					className='p-2 ml-4 hover:bg-blue-600 rounded-full duration-200 transition-colors h-8 w-8 flex justify-center items-center'>
					<img className='w-full' src={arrowLeft} alt='left arrow icon' />
				</button>
				<button
					onClick={nextMonthHandler}
					className='p-2 ml-1 hover:bg-blue-600 rounded-full duration-200 transition-colors h-8 w-8 flex justify-center items-cente'>
					<img className='w-full' src={arrowRight} alt='right arrow icon' />
				</button>
				<h3 className='ml-4 text-xl font-bold'>
					{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}
				</h3>
			</motion.div>
		</header>
	);
};

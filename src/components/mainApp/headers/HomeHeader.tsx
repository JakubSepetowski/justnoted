import { motion } from 'framer-motion';
import { LocalStorage } from '../../../types/types';
import { HeaderWrapper } from '../../ui/HeaderWrapper';
import dayjs from 'dayjs';
import { opacityAnim, titleAnim } from '../../../animations/animations';

const days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];
export const HomeHeader = () => {
	const date = new Date();
	const dayNumber = date.getDate();
	const dayName = days[dayjs().day()];
	const month = date.toLocaleString('en', { month: 'long' });
	const year = date.getFullYear();
	const user: LocalStorage = JSON.parse(localStorage.getItem('user')!);

	return (
		<HeaderWrapper>
			<motion.div variants={opacityAnim} className='text-white  '>
				<motion.h1
					variants={titleAnim}
					className='font-bold max-w-[10rem] md:max-w-md lg:max-w-lg xl:max-w-2xl text-xl sm:text-2xl md:text-3xl lg:text-4xl '>
					Welcome back, {user.name}
				</motion.h1>
				<motion.h2
					variants={titleAnim}
					className='uppercase  md:mt-2 text-xs sm:text-base md:text-lg lg:text-xl'>
					{dayName}, {month} {dayNumber}, {year}
				</motion.h2>
			</motion.div>
		</HeaderWrapper>
	);
};

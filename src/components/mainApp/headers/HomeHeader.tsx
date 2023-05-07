import { LocalStorage } from '../../../types/types';
import { HeaderWrapper } from '../common/HeaderWrapper';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const HomeHeader = () => {
	const date = new Date();
	const dayNumber = date.getDate();
	const dayName = days[date.getDate() - 1];
	const month = date.toLocaleString('en', { month: 'long' });
	const year = date.getFullYear();
	const user: LocalStorage = JSON.parse(localStorage.getItem('user')!);

	return (
		<HeaderWrapper>
			<div className='text-white  '>
				<h1 className='font-bold max-w-[10rem] md:max-w-md lg:max-w-lg xl:max-w-2xl text-xl sm:text-2xl md:text-3xl lg:text-4xl '>
					Welcome back, {user.name}
				</h1>
				<h2 className='uppercase  md:mt-2 text-xs sm:text-base md:text-lg lg:text-xl'>
					{dayName}, {month} {dayNumber}, {year}
				</h2>
			</div>
		</HeaderWrapper>
	);
};

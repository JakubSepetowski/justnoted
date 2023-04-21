import { HeaderWrapper } from './HeaderWrapper';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const HomeHeader = () => {
	const date = new Date();
	const dayNumber = date.getDay();
	const dayName = days[dayNumber - 1];
	const month = date.toLocaleString('en', { month: 'long' });
	const year = date.getFullYear();
    const user =JSON.parse(localStorage.getItem('user')!);

	return (
		<HeaderWrapper>
			<div className='text-white '>
				<h1 className='font-bold text-lg sm:text-3xl md:text-4xl lg:text-5xl max-w-2xl'>
					Welcome back, {user.displayName}
				</h1>
				<h2 className='uppercase  md:mt-2 text-xs sm:text-lg md:text-xl lg:text-2xl'>
					{dayName}, {month} {dayNumber}, {year}
				</h2>
			</div>
		</HeaderWrapper>
	);
};

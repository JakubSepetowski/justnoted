import { NavLink } from 'react-router-dom';
import home from '../../assets/svg/home.svg';

export const Nav = () => {
	return (
		<nav className='w-1/6 h-full bg-zinc-900  shadow-md flex flex-col items-center justify-center'>
			<NavLink
				to='/app/home'
				className={({ isActive }) =>
					isActive
						? 'hover:bg-slate-700 w-full h-10 flex justify-center lg:justify-start items-center transition-colors duration-200 active'
						: 'hover:bg-slate-700 w-full h-10 flex justify-center lg:justify-start items-center transition-colors duration-200'
				}>
				<img className='w-6 lg:ml-4' src={home} alt='home icon' />
				<p className='hidden md:inline text-white ml-2 uppercase text-lg'>home</p>
			</NavLink>
		</nav>
	);
};

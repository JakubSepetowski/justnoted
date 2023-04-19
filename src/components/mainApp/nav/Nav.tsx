import { NavItem } from './NavItem';
import { auth } from '../../../config/firebase';
import { signOut } from 'firebase/auth';
import home from '../../../assets/svg/home.svg';
import notes from '../../../assets/svg/notes.svg';
import add from '../../../assets/svg/add.svg';
import fav from '../../../assets/svg/fav.svg';
import trash from '../../../assets/svg/trash.svg';
import profile from '../../../assets/svg/profile.svg';
import logout from '../../../assets/svg/logout.svg';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../../store/authSlice';
import { useNavigateOnAuth } from '../../hooks/useNavigateOnAuth';
import { useNavigateOnLogout } from '../../hooks/useNavigateOnLogout';

const navItems = [
	{
		id: 0,
		name: 'home',
		icon: home,
		path: '/app/home',
	},
	{
		id: 1,
		name: 'notes',
		icon: notes,
		path: '/app/notes',
	},
	{
		id: 2,
		name: 'add new',
		icon: add,
		path: '/app/addnew',
	},
	{
		id: 3,
		name: 'favourite',
		icon: fav,
		path: '/app/favourite',
	},
	{
		id: 4,
		name: 'trash',
		icon: trash,
		path: '/app/trash',
	},
	{
		id: 5,
		name: 'profile',
		icon: profile,
		path: '/app/profile',
	},
];

export const Nav = () => {
	useNavigateOnLogout()
	const dispatch = useDispatch();
	const logOutHandler = async () => {
		try {
			await signOut(auth);
			alert('Loged out');
			localStorage.removeItem("user");
			dispatch(authSlice.actions.setIsNotAuth());
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<nav className='relative w-1/6 min-w-[4rem] max-w-[5rem] lg:max-w-[20rem] h-full bg-zinc-900  shadow-md flex flex-col items-center justify-center gap-5'>
			<div className='absolute top-0 left-1/2 translate-x-[-50%] hidden lg:block w-11/12 pt-8 pb-4 border-b'>
				<h2 className='text-white text-2xl text-center  '>justNoted</h2>
			</div>

			{navItems.map((item) => (
				<NavItem key={item.id} name={item.name} icon={item.icon} path={item.path} />
			))}
			<button
				onClick={logOutHandler}
				className='hover:bg-neutral-800 hover:shadow-md w-full h-10 md:h-12 xl:h-14 flex justify-center lg:justify-start items-center transition-colors duration-200 mt-8'>
				<img className='w-6 lg:ml-4' src={logout} alt={`log out icon`} />
				<p className='hidden lg:inline text-white ml-2 uppercase text-lg'>log out</p>
			</button>
		</nav>
	);
};

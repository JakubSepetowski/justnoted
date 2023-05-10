import { NavItem } from './NavItem';
import { auth } from '../../../config/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../../store/slices/authSlice';
import { useNavigateOnLogout } from '../../../hooks/useNavigateOnLogout';
import home from '../../../assets/svg/home.svg';
import notes from '../../../assets/svg/notes.svg';
import add from '../../../assets/svg/add.svg';
import cal from '../../../assets/svg/calendar.svg';
import trash from '../../../assets/svg/trash.svg';
import profile from '../../../assets/svg/profile.svg';
import logout from '../../../assets/svg/logout.svg';
import { popupSlice } from '../../../store/slices/popupSlice';

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
		path: '/app/new',
	},
	{
		id: 3,
		name: 'calendar',
		icon: cal,
		path: '/app/calendar',
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
	useNavigateOnLogout();
	const dispatch = useDispatch();
	const logOutHandler = async () => {
		try {
			await signOut(auth);
			localStorage.removeItem('user');
			dispatch(authSlice.actions.setIsNotAuth());
		} catch (err) {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to log out, try again',
					success: false,
				})
			);
		}
	};
	return (
		<nav className='relative w-1/6 min-w-[4rem] max-w-[5rem] lg:max-w-[20rem] h-full bg-zinc-900  shadow-md flex flex-col items-center justify-between'>
			<div className='invisible lg:visible w-11/12 mt-8 pb-4 border-b'>
				<h2 className='text-white text-2xl text-center  '>justNoted</h2>
			</div>

			<div className='w-full flex flex-col gap-3'>
				{navItems.map((item) => (
					<NavItem key={item.id} name={item.name} icon={item.icon} path={item.path} />
				))}
			</div>

			<button
				onClick={logOutHandler}
				className='hover:bg-neutral-800 hover:shadow-md w-full h-10 md:h-12 xl:h-14 flex justify-center lg:justify-start items-center transition-colors duration-200 mb-8'>
				<img className='w-4 md:w-5 xl:w-6 lg:ml-4' src={logout} alt={`log out icon`} />
				<p className='hidden lg:inline text-white ml-2 uppercase'>log out</p>
			</button>
		</nav>
	);
};

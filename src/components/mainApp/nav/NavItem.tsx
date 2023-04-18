import { NavLink } from 'react-router-dom';

interface Props {
	name: string;
	icon: string;
	path: string;
}
export const NavItem = (props: Props) => {
	return (
		<NavLink
			to={props.path}
			className={({ isActive }) =>
				isActive
					? 'hover:bg-neutral-800 hover:shadow-md w-full h-10 md:h-12 xl:h-14 flex justify-center lg:justify-start items-center transition-colors duration-200 active'
					: 'hover:bg-neutral-800 hover:shadow-md w-full h-10 md:h-12 xl:h-14 flex justify-center lg:justify-start items-center transition-colors duration-200'
			}
			end>
			<img className='w-4 md:w-5 xl:w-6 lg:ml-4' src={props.icon} alt={`${props.name} icon`} />
			<p className='hidden lg:inline text-white ml-2 uppercase text-lg'>{props.name}</p>
		</NavLink>
	);
};

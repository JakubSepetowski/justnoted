import { useNavigate } from 'react-router-dom';
import { LocalStorage } from '../../../types/types';

export const UserInfo = () => {
	const navigate = useNavigate();
	const user: LocalStorage = JSON.parse(localStorage.getItem('user')!);

	const goToProfilePageHandler = () => {
		navigate('/app/profile');
	};

	return (
		<div
			onClick={goToProfilePageHandler}
			className='absolute top-5 right-5 bg-zinc-900 sm:p-1 text-white rounded-3xl sm:min-w-0  shadow-md flex items-center cursor-pointer'>
			<img
				className='w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8 rounded-full'
				src={user.photoURL}
				alt='user profile photo'
			/>
			<p className='hidden sm:inline-block sm:pr-2 md:pr-4 ml-2  xl:ml-3'>{user.name}</p>
		</div>
	);
};

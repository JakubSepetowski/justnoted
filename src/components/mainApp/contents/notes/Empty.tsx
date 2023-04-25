import { Player } from '@lottiefiles/react-lottie-player';
import add from '../../../../assets/lotties/add.json';
import { useNavigate } from 'react-router-dom';

export const Empty = () => {
	const navigate = useNavigate();
	const changeRootHandler = () => {
		navigate('/app/new');
	};
	return (
		<div onClick={changeRootHandler} className='flex flex-col justify-center items-center cursor-pointer'>
			<Player src={add} className='w-3/4 md:w-full max-w-md lg:max-w-lg pointer-events-none' loop autoplay />
			<p className='text-lg font-semibold pointer-events-none'>Nothing here yet, go and add new!</p>
		</div>
	);
};

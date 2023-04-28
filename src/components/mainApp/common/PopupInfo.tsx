import { Player } from '@lottiefiles/react-lottie-player';
import done from '../../../assets/lotties/done.json';
export const PopupInfo = () => {
	return (
		<div className='absolute top-5 md:top-20 left-1/2 translate-x-[-50%] md:translate-x-0 md:left-5 w-11/12 md:w-72 h-14 rounded-md p-1 md:p-2 bg-blue-600 shadow-lg shadow-blue-400 flex justify-start items-center'>
			<Player src={done} className='w-12' keepLastFrame autoplay />
            <p className='ml-1 text-xs md:text-sm text-center text-white'>New note had been added!</p>
            <button className='absolute top-0 right-2'>X</button>
		</div>
	);
};

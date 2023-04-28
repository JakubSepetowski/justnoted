import { Player } from '@lottiefiles/react-lottie-player';
import done from '../../../assets/lotties/done.json';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export const PopupInfo = () => {
	const isSuccess = useSelector((state: RootState) => state.popup.isSuccess);
	const message = useSelector((state: RootState) => state.popup.message);
	return (
		<div
			className={`absolute top-5 md:top-20 left-1/2 translate-x-[-50%] md:translate-x-0 md:left-5 w-11/12 md:w-72 h-14 rounded-md p-1 md:p-2  shadow-md  flex justify-start items-center ${
				isSuccess ? 'bg-blue-600 shadow-blue-400' : 'bg-red-700 shadow-red-400'
			} `}>
			{isSuccess && <Player src={done} className='w-12' keepLastFrame autoplay />}
			<p className='ml-1 text-xs md:text-sm text-center text-white'>{message}</p>
		</div>
	);
};

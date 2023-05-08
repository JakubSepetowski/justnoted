import { Player } from '@lottiefiles/react-lottie-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@react-hook/media-query';
import done from '../../assets/lotties/done.json';

export const PopupInfo = () => {
	const isSmallScreen = useMediaQuery('(max-width: 768px)');

	const isSuccess = useSelector((state: RootState) => state.popup.isSuccess);
	const message = useSelector((state: RootState) => state.popup.message);

	const variants = {
		hidden: {
			opacity: 0,
			...(isSmallScreen ? {} : { x: -150 }),
		},
		visible: {
			opacity: 1,
			...(isSmallScreen ? {} : { x: 0 }),
			transition: { duration: 0.3, ease: 'easeOut' },
		},
		exit: {
			opacity: 0,
			...(isSmallScreen ? {} : { x: -150 }),
			transition: { duration: 0.3, ease: 'easeOut' },
		},
	};

	return (
		<motion.div
			key='popup'
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='exit'
			className={`absolute top-5 md:top-20 left-1/2 translate-x-[-50%] md:translate-x-0 md:left-5 w-11/12 md:w-72 h-14 rounded-md p-1 md:p-2  shadow-md  flex justify-start items-center ${
				isSuccess ? 'bg-blue-600 shadow-blue-400' : 'bg-red-700 shadow-red-400'
			} `}>
			{isSuccess && <Player src={done} className='w-12' keepLastFrame autoplay />}
			<p className='ml-1 text-xs md:text-sm text-center text-white'>{message}</p>
		</motion.div>
	);
};

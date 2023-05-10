import { Player } from '@lottiefiles/react-lottie-player';
import add from '../../../../assets/lotties/add.json';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { opacityAnim } from '../../../../animations/animations';

interface Props {
	isTrash: boolean;
}

export const Empty = ({ isTrash }: Props) => {
	const navigate = useNavigate();
	const changeRootHandler = () => {
		navigate('/app/new');
	};
	return (
		<motion.div
		layout
			key='empty'
			variants={opacityAnim}
			initial='hidden'
			animate='visible'
			exit='exit'
			onClick={changeRootHandler}
			className='flex flex-col justify-center items-center cursor-pointer'>
			<Player
				src={add}
				className='w-1/2 md:w-full max-w-md lg:max-w-lg pointer-events-none'
				loop
				autoplay
			/>
			{!isTrash && (
				<p className='text-lg text-center font-semibold pointer-events-none'>
					Nothing here yet, go and add new!
				</p>
			)}
			{isTrash && (
				<p className='text-lg text-center font-semibold pointer-events-none'>Trash is empty!</p>
			)}
		</motion.div>
	);
};

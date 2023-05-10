import { useState } from 'react';
import edit from '../../../../assets/svg/edit.svg';
import help from '../../../../assets/svg/info.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { opacityAnim } from '../../../../animations/animations';

interface Props {
	title: string;
	titleImg: string;
	info: string;
	onClick: () => void;
}

export const CardHeader = ({ title, titleImg, info, onClick }: Props) => {
	const [isHovering, setIsHovering] = useState(false);

	const mouseOverHandler = () => {
		setIsHovering(true);
	};

	const mouseOutHandler = () => {
		setIsHovering(false);
	};
	return (
		<div className='flex w-full justify-between items-center '>
			<div className='flex justify-start items-center w-auto border-b pb-2'>
				<h3 className='text-sm md:text-lg lg:text-xl'>{title}</h3>
				<img className='ml-2 w-4 h-4 md:w-6 md:h-6' src={titleImg} alt='important icon' />
			</div>
			<div className='flex'>
				<button onClick={onClick}>
					<img className='w-4 h-4 md:w-6 md:h-6 ' src={edit} alt='edit button icon' />
				</button>
				<div
					className='ml-2 cursor-help'
					onMouseOver={mouseOverHandler}
					onTouchStart={mouseOverHandler}
					onMouseOut={mouseOutHandler}
					onTouchEnd={mouseOutHandler}>
					<img className='w-8 h-8' src={help} alt='help icon' />
				</div>
			</div>
			<AnimatePresence>
				{isHovering && (
					<motion.div
						key={title + 'info'}
						variants={opacityAnim}
						initial='hidden'
						animate='visible'
						exit='exit'
						className='absolute top-0 left-0 bg-blue-700 text-white w-full md:w-2/3 p-4 z-20 rounded-md shadow-md'>
						<p>{info}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

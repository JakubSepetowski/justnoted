import { useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { fromLeftAnim, opacityAnim } from '../../../../animations/animations';

export const DeleteAccount = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const setModalHandler = () => {
		setIsModalOpen((prev) => !prev);
	};

	return (
		<div className='mt-4 md:mt-8'>
			<motion.h4
				variants={fromLeftAnim}
				className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-red-600'>
				Delete account
			</motion.h4>
			<motion.div
				variants={opacityAnim}
				className='mt-4 w-full h-auto p-2 md:p-4 border rounded-lg  '>
				<button
					onClick={setModalHandler}
					className=' border p-2 pr-4 pl-4  rounded-md transition-colors bg-transparent text-red-600 duration-200 hover:bg-red-600 hover:text-white w-full md:w-auto'>
					Delete your account
				</button>
			</motion.div>
			{isModalOpen &&
				createPortal(
					<DeleteModal onCloseModal={setModalHandler} />,
					document.getElementById('modal')!
				)}
		</div>
	);
};

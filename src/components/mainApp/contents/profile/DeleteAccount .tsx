import { useState } from 'react';
import { DeleteModal } from './DeleteModal';
import { createPortal } from 'react-dom';



export const DeleteAccount = () => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	
	const setPopupHandler = () => {
		setIsPopupOpen((prev) => !prev);
	};


	return (
		<div className='mt-4 md:mt-8'>
			<h2 className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-red-600'>
				Delete account
			</h2>
			<div className='mt-4 w-full h-auto p-2 md:p-4 border rounded-lg  '>
				<button
					onClick={setPopupHandler}
					className=' border p-2 pr-4 pl-4  rounded-md transition-colors bg-transparent text-red-600 duration-200 hover:bg-red-600 hover:text-white w-full md:w-auto'>
					Delete your account
				</button>
			</div>
			{isPopupOpen &&
				createPortal(
					<DeleteModal onCloseModal={setPopupHandler} />,
					document.getElementById('modal')!
				)}
		</div>
	);
};

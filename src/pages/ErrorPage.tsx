import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import error from '../assets/lotties/404.json';

export const ErrorPage = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-full relative max-w-7xl mx-auto p-4'>
			<h1 className='text-3xl md:text-4xl mb-10 text-center'>Sorry, that page could not be find</h1>
			<Player autoplay loop src={error} style={{ height: '100%', width: '100%' }}></Player>
			<Link
				to='/'
				className='p-2 pl-3 pr-3 md:pl-4 md:pr-4 mt-2 bg-blue-700 rounded-lg md:text-2xl transition-colors duration-200 hover:bg-blue-600 text-white'>
				BACK HOME
			</Link>
		</div>
	);
};

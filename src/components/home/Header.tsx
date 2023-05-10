import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import notes from '../../assets/lotties/notes.json';
import { motion } from 'framer-motion';
import { fromBottomAnim, fromRigthAnim, opacityHomeAnim } from '../../animations/animations';

export const Header = () => {
	return (
		<motion.header
			variants={opacityHomeAnim}
			initial='hidden'
			animate='visible'
			className='h-screen w-full relative'>
			<nav className='absolute top-0 left-1/2 translate-x-[-50%]  max-w-7xl w-full flex justify-between items-center pb-4 pt-4 pr-8 pl-8 md:pb-6 md:pt-6  md:text-2xl z-50 border-b-2 border-black bg-bgc'>
				<Link className='' to='/'>
					JustNoted
				</Link>
				<Link to='login'>Login</Link>
			</nav>
			<div className='w-full min-h-full max-w-7xl mx-auto flex flex-col items-center justify-center p-8 lg:flex-row md:text-center lg:text-left lg:justify-between'>
				<div className='w-full lg:w-1/2 '>
					<div className='mx-auto md:w-3/4 lg:w-full'>
						<motion.p variants={fromBottomAnim} className='md:text-xl lg:text-2xl  '>
							To simplify your life
						</motion.p>
						<motion.h1
							variants={fromBottomAnim}
							className='mt-1 font-semibold text-2xl   md:text-4xl md:mt-2 lg:text-5xl lg:mt-3'>
							All plans and thoughts <span className='text-blue-700'>available</span> in one place
						</motion.h1>

						<motion.div variants={fromBottomAnim}>
							<Link
								to='register'
								className='inline-block text-lg mt-2 mb-4 md:mt-10 md:mb-10 md:text-3xl lg:text-3xl'>
								Get start for <span className='text-blue-700 font-semibold'>free</span>
							</Link>
						</motion.div>
					</div>
				</div>

				<motion.div variants={fromRigthAnim}>
					<Player src={notes} className='w-3/4 md:w-full max-w-md lg:max-w-lg' loop autoplay />
				</motion.div>
			</div>
		</motion.header>
	);
};

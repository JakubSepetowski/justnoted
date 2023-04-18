import { Link } from 'react-router-dom';
import { RegisterHeaderContent } from '../register/RegisterHeaderContent';
import { LoginForm } from './LoginForm';

export const LoginHeader = () => {
	return (
		<header className='h-screen w-full'>
			<div className=' mx-auto w-full h-full max-w-7xl flex flex-col lg:flex-row  lg:p-8 lg:justify-between'>
				<RegisterHeaderContent title='Welocme back!' desc="it's going to be a productive day" />
				<div className='w-full flex flex-col md:justify-center items-center lg:w-2/3  h-full p-4 md:p-8 md:overflow-x-auto'>
					<div className='w-full md:w-3/4 mt-4 md:mt-0 '>
						<h2 className='font-bold md:text-2xl'>Log in</h2>
						<p>
							New to justNoted?{' '}
							<Link to='/register' className='text-blue-700 font-semibold'>
								Get Started
							</Link>{' '}
						</p>
					</div>
					<LoginForm/>
				</div>
			</div>
		</header>
	);
};

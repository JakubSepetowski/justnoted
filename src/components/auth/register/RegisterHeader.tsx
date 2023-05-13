import { Link } from 'react-router-dom';
import { RegisterHeaderContent } from './RegisterHeaderContent';
import { RegisterForm } from './RegisterForm';

export const RegisterHeader = () => {
	return (
		<header className='h-screen w-full'>
			<div className=' mx-auto w-full h-full max-w-7xl flex flex-col lg:flex-row  lg:p-8 lg:justify-between'>
				<RegisterHeaderContent
					title='Start your journey with us!'
					desc='Discover the app that will allow you to be as organized as possible'
				/>
				<div className='w-full md:flex md:flex-col md:justify-center md:items-center lg:w-2/3  h-full p-4 md:p-8 md:overflow-x-auto'>
					<div className='md:w-3/4  '>
						<h2 className='font-bold md:text-2xl'>Sing up</h2>
						<p>
							Have an account?{' '}
							<Link to='/login' className='text-blue-700 font-semibold'>
								Sing in
							</Link>{' '}
						</p>
					</div>
					<RegisterForm />
				</div>
			</div>
		</header>
	);
};

import logo from '../../../assets/imgs/googleLogo.webp';
export const RegisterForm = () => {
	return (
		<form className='md:w-3/4'>
			<div className='flex flex-col  mt-4 md:mt-10 md:text-lg'>
				<label htmlFor='fname'>Name</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					type='text'
					id='fname'
				/>
			</div>
			<div className='flex flex-col  mt-4 md:mt-6  md:text-lg'>
				<label htmlFor='email'>Email</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					type='email'
					id='email'
				/>
			</div>
			<div className='flex flex-col  mt-4 md:mt-6 md:text-lg'>
				<label htmlFor='password'>Password</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					type='password'
					id='password'
				/>
			</div>
			<div className='flex flex-col  mt-4 md:mt-6  md:text-lg'>
				<label htmlFor='repeatPassword'>Repeat password</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					type='password'
					id='repeatPassword'
				/>
			</div>
			<button className='w-full bg-blue-700  text-white p-2 rounded-md mt-12 shadow-md'>
				Create account
			</button>
			<p className='text-center mt-4 font-semibold'>OR</p>

			<div className='w-full flex items-center justify-center bg-white shadow-md p-2 mt-4 rounded-md cursor-pointer '>
				<img className='w-6' alt='Google sign-up' src={logo} />
				<p className='ml-2'>Singup with Google</p>
			</div>
		</form>
	);
};

import logo from "../../../assets/imgs/googleLogo.webp"
export const LoginForm = () => {
	return (
		<form className='w-full md:w-3/4'>
			<div className='flex flex-col  mt-4 md:mt-10  md:text-lg'>
				<label htmlFor='email'>Email</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1 text-blue-700 placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					type='email'
					id='email'
				/>
			</div>
			<div className='flex flex-col  mt-4 md:mt-6 md:text-lg'>
				<label htmlFor='password'>Password</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1 text-blue-700 placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					type='password'
					id='password'
				/>
			</div>
			<button className='w-full bg-blue-700 text-white p-2 rounded-md mt-12 shadow-md'>
				Log in
			</button>
			<p className='text-center mt-4 font-semibold'>OR</p>

			<div className='w-full flex items-center justify-center bg-white shadow-md p-2 mt-4 rounded-md cursor-pointer'>
				<img
					className='w-6'
					alt='Google log-in'
					src={logo}
				/>
				<p className='ml-2'>Continue with Google</p>
			</div>
		</form>
	);
};

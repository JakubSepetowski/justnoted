import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../../../assets/imgs/googleLogo.webp';
export const LoginForm = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Email is required').email('Email must be valid'),
			password: Yup.string()
				.required('Password is required')
				.min(6, 'Password must be at least 6 characters long')
				.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
				.matches(/[a-z]/, 'Password mast have at least one lowercase char')
				.matches(/[0-9]/, 'Password mast have at least one number'),
		}),
		onSubmit: (values, { resetForm }) => {
			console.log(values);
			resetForm();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className='w-full md:w-3/4'>
			<div className='flex flex-col  mt-4 md:mt-10  md:text-lg'>
				<label
					className={`${formik.touched.email && formik.errors.email ? 'text-red-400' : ''}`}
					htmlFor='email'>
					{formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}
				</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type='email'
					id='email'
				/>
			</div>
			<div className='flex flex-col  mt-4 md:mt-6 md:text-lg'>
				<label
					className={`${formik.touched.password && formik.errors.password ? 'text-red-400' : ''}`}
					htmlFor='password'>
					{formik.touched.password && formik.errors.password ? formik.errors.password : 'Password'}
				</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type='password'
					id='password'
				/>
			</div>
			<button
				disabled={!(formik.dirty && formik.isValid)}
				type='submit'
				className={`w-full transition-colors duration-200 text-white p-2 rounded-md mt-12 shadow-md ${
					!(formik.dirty && formik.isValid) ? 'bg-neutral-500' : 'bg-blue-700'
				}`}>
				Log in
			</button>
			<p className='text-center mt-4 font-semibold'>OR</p>

			<div className='w-full flex items-center justify-center bg-white shadow-md p-2 mt-4 rounded-md cursor-pointer'>
				<img className='w-6' alt='Google log-in' src={logo} />
				<p className='ml-2'>Continue with Google</p>
			</div>
		</form>
	);
};

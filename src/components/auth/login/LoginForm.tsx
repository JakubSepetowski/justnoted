import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, dataBase, googleProvider } from '../../../config/firebase';
import { useFormik } from 'formik';
import logo from '../../../assets/imgs/googleLogo.webp';
import { useNavigateOnAuth } from '../../../hooks/useNavigateOnAuth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../../store/slices/authSlice';
import { LoginUserData, LoginErrMsgs } from '../../../types/types';
import * as Yup from 'yup';
import { createCollection } from '../../../utils/utils';
import { collection, getDocs } from 'firebase/firestore';

export const LoginForm = () => {
	useNavigateOnAuth();
	const dispatch = useDispatch();
	const [errorMg, setErrorMg] = useState('');
	const [isSending, setIsSending] = useState(false);
	const LoginByEmailHanlder = async (values: LoginUserData) => {
		try {
			const res = await signInWithEmailAndPassword(auth, values.email, values.password);
			setErrorMg('');
			localStorage.setItem(
				'user',
				JSON.stringify({
					name: res.user.displayName,
					email: res.user.email,
					photoURL: res.user.photoURL,
					uid: res.user.uid,
				})
			);
			dispatch(authSlice.actions.setIsAuth());
		} catch (err) {
			let message = '';
			if (err instanceof Error) message = err.message;
			switch (message) {
				case LoginErrMsgs.wrongPassword:
					setErrorMg('Wrong passwrod');
					break;
				case LoginErrMsgs.noUser:
					setErrorMg('Wrong email');
					break;
				default:
					setErrorMg('Unexpeted error, try again.');
			}
		}
		setIsSending(false);
	};
	const LoginByGoogleHanlder = async () => {
		setIsSending(true);
		try {
			const res = await signInWithPopup(auth, googleProvider);
			if (res) {
				setErrorMg('');
				localStorage.setItem(
					'user',
					JSON.stringify({
						name: res.user.displayName,
						email: res.user.email,
						uid: res.user.uid,
						photoURL: res.user.photoURL,
					})
				);

				const homeNotesColection = collection(dataBase, `users/${auth.currentUser?.uid}/home`);

				const querySnapshot = await getDocs(homeNotesColection);
				const data = querySnapshot;
				const filteredData = data.docs.map((doc) => ({
					...doc.data(),
				}));

				if (filteredData.length === 0) createCollection();

				dispatch(authSlice.actions.setIsAuth());
			}
		} catch (err) {
			setErrorMg('Unexpeted error, try again.');
		}
		setIsSending(false);
	};
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Email is required').email('Email must be valid').trim(),
			password: Yup.string()
				.required('Password is required')
				.min(6, 'Password must be at least 6 characters long')
				.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
				.matches(/[a-z]/, 'Password mast have at least one lowercase char')
				.matches(/[0-9]/, 'Password mast have at least one number')
				.trim(),
		}),
		onSubmit: (values, { resetForm }) => {
			setIsSending(true);
			LoginByEmailHanlder(values);
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
			{errorMg && <p className='mt-2 text-red-400'>{errorMg}</p>}
			<button
				disabled={!(formik.dirty && formik.isValid)}
				type='submit'
				className={`w-full transition-colors duration-200 text-white p-2 rounded-md mt-12 shadow-md ${
					!(formik.dirty && formik.isValid) ? 'bg-neutral-500' : 'bg-blue-700'
				} ${isSending ? 'loading' : ''}`}>
				{isSending ? 'Please wait' : 'Login'}
			</button>
			<p className='text-center mt-4 font-semibold'>OR</p>

			<div
				onClick={LoginByGoogleHanlder}
				className='w-full flex items-center justify-center bg-white shadow-md p-2 mt-4 rounded-md cursor-pointer'>
				<img className='w-6' alt='Google log-in' src={logo} />
				<p className='ml-2'>Continue with Google</p>
			</div>
		</form>
	);
};

import { useFormik } from 'formik';
import { auth, dataBase, googleProvider } from '../../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { authSlice } from '../../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import logo from '../../../assets/imgs/googleLogo.webp';
import { useNavigateOnAuth } from '../../../hooks/useNavigateOnAuth';
import { useState } from 'react';
import { NewUserData, RegisterErrMsgs } from '../../../types/types';
import { collection, setDoc, doc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

export const RegisterForm = () => {
	const [errorMg, setErrorMg] = useState('');
	const [isSending, setIsSending] = useState(false);
	useNavigateOnAuth();
	const dispatch = useDispatch();

	const createCollection = async () => {
		const homeNotesColection = collection(dataBase, `users/${auth.currentUser?.uid}/home`);
		const id = uuid();
		try {
			await setDoc(doc(homeNotesColection, id), {
				id,
				importantNoteDesc: '',
				quicktNoteDesc: '',
			});
		} catch (err) {
			throw new Error();
		}
	};

	const singByEmailHandler = async (values: NewUserData) => {
		try {
			const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
			if (res) {
				setErrorMg('');
				if (auth.currentUser) {
					await updateProfile(auth.currentUser, {
						displayName: values.fname,
						photoURL:
							'https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png',
					});
				}
				localStorage.setItem(
					'user',
					JSON.stringify({
						name: values.fname,
						email: values.email,
						uid: res.user.uid,
						photoURL: res.user.photoURL,
					})
				);
				createCollection();
				dispatch(authSlice.actions.setIsAuth());
			}
		} catch (err) {
			let message = '';
			if (err instanceof Error) message = err.message;
			switch (message) {
				case RegisterErrMsgs.inUse:
					setErrorMg('This email is already in use. Please log in');
					break;
				default:
					setErrorMg('Unexpeted error, try again.');
			}
		}
		setIsSending(false);
	};
	const singByGoogleHandler = async () => {
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
				createCollection();
				dispatch(authSlice.actions.setIsAuth());
			}
		} catch (err) {
			setErrorMg('Unexpeted error, try again.');
		}
		setIsSending(false);
	};

	const formik = useFormik({
		initialValues: {
			fname: '',
			email: '',
			password: '',
			repeatPassword: '',
		},
		validationSchema: Yup.object({
			fname: Yup.string()
				.required('Name is required')
				.min(3, 'Name must be at least 3 characters long')
				.max(15, 'Name can not be longer than 10 chars')
				.trim(),
			email: Yup.string().required('Email is required').email('Email must be valid').trim(),
			password: Yup.string()
				.required('Password is required')
				.min(6, 'Password must be at least 6 characters long')
				.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
				.matches(/[a-z]/, 'Password mast have at least one lowercase char')
				.matches(/[0-9]/, 'Password mast have at least one number')
				.trim(),

			repeatPassword: Yup.string()
				.required('Please confirm your password')
				.oneOf([Yup.ref('password')], 'Passwords must match')
				.trim(),
		}),
		onSubmit: (values, { resetForm }) => {
			setIsSending(true);
			singByEmailHandler(values);
			resetForm();
		},
	});

	return (
		<form onSubmit={formik.handleSubmit} className='md:w-3/4'>
			<div className='flex flex-col  mt-4 md:mt-10 md:text-lg '>
				<label
					className={`${formik.touched.fname && formik.errors.fname ? 'text-red-400' : ''}`}
					htmlFor='fname'>
					{formik.touched.fname && formik.errors.fname ? formik.errors.fname : 'Name'}
				</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					value={formik.values.fname}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type='text'
					id='fname'
				/>
			</div>
			<div className='flex flex-col  mt-4 md:mt-6  md:text-lg'>
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
			<div className='flex flex-col  mt-4 md:mt-6  md:text-lg'>
				<label
					className={`${
						formik.touched.repeatPassword && formik.errors.repeatPassword ? 'text-red-400' : ''
					}`}
					htmlFor='repeatPassword'>
					{formik.touched.repeatPassword && formik.errors.repeatPassword
						? formik.errors.repeatPassword
						: 'Repeat password'}
				</label>
				<input
					className='autofill:bg-none bg-blue-100 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-200 registerInputs rounded-md'
					value={formik.values.repeatPassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					type='password'
					id='repeatPassword'
				/>
			</div>
			{errorMg && <p className='mt-2 text-red-400'>{errorMg}</p>}
			<button
				disabled={!(formik.dirty && formik.isValid)}
				type='submit'
				className={`w-full transition-colors duration-200 text-white p-2 rounded-md mt-12 shadow-md  ${
					!(formik.dirty && formik.isValid) ? 'bg-neutral-500' : 'bg-blue-700'
				} ${isSending ? 'loading' : ''}`}>
				{isSending ? 'Please wait' : 'Create account'}
			</button>
			<p className='text-center mt-4 font-semibold'>OR</p>

			<div
				onClick={singByGoogleHandler}
				className='w-full flex items-center justify-center bg-white shadow-md p-2 mt-4 rounded-md cursor-pointer '>
				<img className='w-6' alt='Google sign-up' src={logo} />
				<p className='ml-2'>Singup with Google</p>
			</div>
		</form>
	);
};

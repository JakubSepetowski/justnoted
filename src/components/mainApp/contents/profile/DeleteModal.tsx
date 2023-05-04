import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LocalStorage } from '../../../../types/types';
import {
	EmailAuthProvider,
	reauthenticateWithCredential,
	deleteUser,
	signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, dataBase } from '../../../../config/firebase';
import { useNavigateOnLogout } from '../../../../hooks/useNavigateOnLogout';
import { useDispatch } from 'react-redux';
import { authSlice } from '../../../../store/authSlice';
import { collection, doc, deleteDoc } from 'firebase/firestore';

interface Props {
	onCloseModal: () => void;
}

interface Values {
	email: string;
	password: string;
	confirm?: string;
}

export const DeleteModal = ({ onCloseModal }: Props) => {
	useNavigateOnLogout();
	const dispatch = useDispatch();
	const localUser: LocalStorage = JSON.parse(localStorage.getItem('user')!);
	const [isSending, setIsSending] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [errorMgs, setErrorMgs] = useState('');

	const closeModalHandler = () => {
		onCloseModal();
	};

	const reauthenticateUser = async (val: Values) => {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(val.email, val.password);
		try {
			if (user) await reauthenticateWithCredential(user, credential);
			deleteUserHandler();
			setErrorMgs('');
		} catch (err) {
			setErrorMgs('Wrong email or password');
			setIsSending(false);
		}
	};
	const deleteUserHandler = async () => {
		try {
			const user = auth.currentUser;
			if (user) await deleteUser(user);
			await signOut(auth);
			localStorage.removeItem('user');
			setErrorMgs('');
			setIsDeleted(true);
		} catch{
			setErrorMgs('Failed to delete account, try again');
		}

		setIsSending(false);
	};

	useEffect(() => {
		if (!isDeleted) return;
		const timer = setTimeout(() => {
			dispatch(authSlice.actions.setIsNotAuth());
		}, 2500);

		return () => clearTimeout(timer);
	}, [isDeleted]);

	const stopPropagationHanlder = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirm: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().required('Email is required').email('Email must be valid'),
			password: Yup.string()
				.required('Password is required')
				.min(6, 'Password must be at least 6 characters long')
				.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
				.matches(/[a-z]/, 'Password mast have at least one lowercase char')
				.matches(/[0-9]/, 'Password mast have at least one number')
				.trim(),
			confirm: Yup.string()
				.required('You must confrim')
				.matches(/delete account/, 'You must confirm with "delete account"'),
		}),
		onSubmit: (values, { resetForm }) => {
			setIsSending(true);
			reauthenticateUser(values);
			resetForm();
		},
	});

	return (
		<div
			onClick={closeModalHandler}
			className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] h-screen w-full z-20 bg-black bg-opacity-80 backdrop-blur-md flex justify-center items-center text-white'>
			<div
				onClick={stopPropagationHanlder}
				className=' bg-bgc w-4/5 h-4/6 md:w-1/3 md:h-[55%] z-50 rounded-md shadow-md   flex flex-col overflow-hidden relative'>
				<div className='flex w-full items-center justify-between bg-zinc-900   p-4 '>
					<h3 className=' md:text-lg'>Are you sure to do this? It cannot be undone</h3>
					<button onClick={closeModalHandler}>X</button>
				</div>

				<div className='h-full  bg-zinc-800 overflow-y-auto p-4 noscroll text-sm md:text-base'>
					<p className='mt-4 border-b pb-2 border-neutral-600'>
						We will immediately delete your account, along with all of your notes and data
					</p>
					<form
						onSubmit={formik.handleSubmit}
						className='mt-4  w-full p-2 rounded-lg flex flex-col justify-center  '>
						<div className='flex flex-col '>
							<label htmlFor='email'>Email</label>
							<input
								className='autofill:bg-none  focus:outline-none p-1 bg-transparent   registerInputs registerInputs--white rounded-md border focus:border-blue-700  border-neutral-600 mt-1'
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								type='email'
								id='email'
							/>
							{formik.errors.email && (
								<p className='text-xs text-red-400 mt-1'>{formik.errors.email}</p>
							)}
						</div>
						<div className='flex flex-col mt-4 '>
							<label htmlFor='password'>Password</label>
							<input
								className='autofill:bg-none  focus:outline-none p-1 bg-transparent   registerInputs registerInputs--white rounded-md border focus:border-blue-700  border-neutral-600 mt-1'
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								type='password'
								id='password'
							/>
							{formik.errors.password && (
								<p className='text-xs text-red-400 mt-1'>{formik.errors.password}</p>
							)}
						</div>
						<div className='flex flex-col mt-4 '>
							<label htmlFor='confirm'>
								To verify, type <span className='font-bold italic '>delete account</span> below:
							</label>
							<input
								className='autofill:bg-none  focus:outline-none p-1 bg-transparent   registerInputs registerInputs--white rounded-md border focus:border-blue-700  border-neutral-600 mt-1'
								value={formik.values.confirm}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								type='text'
								id='confirm'
							/>
							{formik.errors.confirm && (
								<p className='text-xs text-red-400 mt-1'>{formik.errors.confirm}</p>
							)}
						</div>
						<button
							disabled={!(formik.dirty && formik.isValid)}
							type='submit'
							className={`w-full  transition-colors duration-200  p-1 rounded-md mt-8    ${
								!(formik.dirty && formik.isValid)
									? 'bg-transparent text-red-600 border border-neutral-600 '
									: 'bg-red-600 text-white hover:bg-red-700'
							}${isSending ? 'loading' : ''}`}>
							{isSending ? 'Deleting, please waite' : 'Delete my account'}
						</button>
						{errorMgs && <p className='mt-2 text-center text-red-400 '>{errorMgs}</p>}
					</form>
					{isDeleted && (
						<div className='absolute z-50 top-0 left-0 h-full w-full bg-zinc-800 flex flex-col justify-center items-center p-4 '>
							<h3 className='text-lg'>
								Your account has been successfully deleted.Thank you for using my application and
								see you there!
							</h3>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

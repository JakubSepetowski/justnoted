import { useFormik } from 'formik';
import { H2 } from '../../common/H2';
import * as Yup from 'yup';
import { auth } from '../../../../config/firebase';
import { EmailAuthProvider } from 'firebase/auth';
import { reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { LocalStorage } from '../../../../types/types';
import { useState } from 'react';
import { popupSlice } from '../../../../store/popupSlice';
import { useDispatch } from 'react-redux';

interface Values {
	password: string;
	newPassword: string;
}
export const Security = () => {
	const localUser: LocalStorage = JSON.parse(localStorage.getItem('user')!);
	const [hasError, setHasError] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const dispatch = useDispatch();

	const reauthenticateUser = async (val: Values) => {
		const user = auth.currentUser;
		const credential = EmailAuthProvider.credential(localUser.email, val.password);
		try {
			if (user) await reauthenticateWithCredential(user, credential);
			updateUserPassword(val.newPassword);
			setHasError(false);
		} catch{
			setHasError(true);
			setIsSending(false);
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to authenticate - wrong password',
					success: false,
				})
			);
		}
	};

	const updateUserPassword = async (pass: string) => {
		const user = auth.currentUser;
		try {
			if (user) await updatePassword(user, pass);
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Password was changed',
					success: true,
				})
			);
		} catch{
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to update password, try again',
					success: false,
				})
			);
		}
		setIsSending(false);
	};

	const formik = useFormik({
		initialValues: {
			password: '',
			newPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.required('Password is required')
				.min(6, 'Password must be at least 6 characters long')
				.matches(/[A-Z]/, 'Password mast have at least one uppercase char')
				.matches(/[a-z]/, 'Password mast have at least one lowercase char')
				.matches(/[0-9]/, 'Password mast have at least one number')
				.trim(),
			newPassword: Yup.string()
				.required('New password is required')
				.min(6, 'New password must be at least 6 characters long')
				.matches(/[A-Z]/, 'New password mast have at least one uppercase char')
				.matches(/[a-z]/, 'New password mast have at least one lowercase char')
				.matches(/[0-9]/, 'New password mast have at least one number')
				.notOneOf([Yup.ref('password')], 'New password must be different')
				.trim(),
		}),
		onSubmit: (values, { resetForm }) => {
			reauthenticateUser(values);
			setIsSending(true);
			resetForm();
		},
	});
	return (
		<div className='mt-4 md:mt-8'>
			<H2 title='Change Password' />
			<form
				onSubmit={formik.handleSubmit}
				className='mt-4  w-full p-2 md:p-4 border rounded-lg flex flex-col justify-center  '>
				<div className='flex flex-col md:w-1/2 md:text-lg'>
					<label
						className={`${formik.touched.password && formik.errors.password ? 'text-red-400' : ''}`}
						htmlFor='password'>
						{formik.touched.password && formik.errors.password
							? formik.errors.password
							: 'Password'}
					</label>
					<input
						className='autofill:bg-none bg-zinc-200 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-zinc-300 registerInputs rounded-md'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type='password'
						id='password'
					/>

					{hasError && <p className='text-red-400 text-sm mt-1'>Wrong password</p>}
				</div>
				<div className='flex flex-col md:w-1/2 mt-4  md:text-lg'>
					<label
						className={`${
							formik.touched.newPassword && formik.errors.newPassword ? 'text-red-400' : ''
						}`}
						htmlFor='newPassword'>
						{formik.touched.newPassword && formik.errors.newPassword
							? formik.errors.newPassword
							: 'New Password'}
					</label>
					<input
						className='autofill:bg-none bg-zinc-200 focus:outline-none p-1  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-zinc-300 registerInputs rounded-md'
						value={formik.values.newPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						type='password'
						id='newPassword'
					/>
				</div>
				<button
					disabled={!(formik.dirty && formik.isValid)}
					type='submit'
					className={`w-full md:w-1/2 transition-colors duration-200 text-white p-2 rounded-md mt-8 shadow-md  ${
						!(formik.dirty && formik.isValid)
							? 'bg-neutral-500'
							: 'bg-blue-700 duration-200 transition-colors hover:bg-blue-600 '
					} ${isSending ? 'loading' : ''}`}>
					{isSending ? 'Please wait' : 'Change password'}
				</button>
			</form>
		</div>
	);
};

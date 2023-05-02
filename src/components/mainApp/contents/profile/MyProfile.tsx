import { ChangeEvent, useState } from 'react';
import { auth } from '../../../../config/firebase';
import { H2 } from '../../common/H2';
import { useFormik } from 'formik';
import { updateProfile } from 'firebase/auth';
import { LocalStorage } from '../../../../types/types';
import { useDispatch } from 'react-redux';
import { popupSlice } from '../../../../store/popupSlice';
import { storage } from '../../../../config/firebase';
import { ref, uploadBytes, list, getDownloadURL } from 'firebase/storage';
import { Spinner } from '../../common/Spinner';
import camera from '../../../../assets/svg/camera.svg';
import * as Yup from 'yup';

export const MyProfile = () => {
	const user: LocalStorage = JSON.parse(localStorage.getItem('user')!);

	const [isEditting, setIsEditting] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [currentName, setcurrentName] = useState(user.name);
	const dispatch = useDispatch();

	const updateNameHandler = async (name: string) => {
		if (!auth.currentUser) return;
		try {
			await updateProfile(auth.currentUser, {
				displayName: name,
			});
			setcurrentName(name);
			localStorage.setItem(
				'user',
				JSON.stringify({
					...user,
					name: name,
				})
			);
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Name has been edited',
					success: true,
				})
			);
		} catch (err) {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to edit name, try again',
					success: false,
				})
			);
		}
	};

	const updateProfileImg = async (url: string) => {
		if (!auth.currentUser) return;
		try {
			await updateProfile(auth.currentUser, {
				photoURL: url,
			});
			localStorage.setItem(
				'user',
				JSON.stringify({
					...user,
					photoURL: url,
				})
			);
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Profile image was updated',
					success: true,
				})
			);
		} catch (err) {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to update profile image',
					success: true,
				})
			);
		}
		setIsSending(false);
	};

	const upoladImgHandler = async (img: FileList) => {
		const imageRef = ref(storage, `profileImgs/user/${auth.currentUser?.uid}/profile`);
		const imageListRef = ref(storage, `profileImgs/user/${auth.currentUser?.uid}/`);

		setIsSending(true);
		try {
			await uploadBytes(imageRef, img[0]);
			const data = await list(imageListRef);
			const url = await getDownloadURL(data.items[0]);
			updateProfileImg(url);
		} catch (err) {
			setIsSending(false);
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to upload',
					success: false,
				})
			);
		}
	};

	const setImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const target = e.target.files;
		if (target?.length != 0 && target !== null) upoladImgHandler(target);
	};

	const toggleEditHandler = () => {
		setIsEditting((prev) => !prev);
		formik.setValues({ fname: currentName });
	};

	const saveChangesHandler = () => {
		formik.submitForm();
		setIsEditting(false);
	};

	const formik = useFormik({
		initialValues: {
			fname: currentName,
		},
		validationSchema: Yup.object({
			fname: Yup.string()
				.required('Name is required')
				.min(3, 'Name must be at least 3 characters long')
				.max(15, 'Name can not be longer than 10 chars'),
		}),
		onSubmit: (values, { resetForm }) => {
			updateNameHandler(values.fname);
			resetForm();
		},
	});

	return (
		<div className='mt-16'>
			<H2 title='My Profile' />
			<div className='mt-4 w-full h-auto p-2 md:p-4 border rounded-lg flex flex-col justify-center items-center md:flex-row '>
				<div className='relative flex flex-col justify-center items-center'>
					<img
						className='w-20 h-20 md:w-24 md:h-24 rounded-full'
						src={user.photoURL}
						alt='profile image'
					/>
					{isSending && <Spinner />}

					<label
						htmlFor='file'
						role='button'
						className='absolute bottom-0 right-0  bg-white shadow-md w-8 h-8  rounded-full flex justify-center items-center '>
						<img className='w-1/2 ' src={camera} alt='camera icon' />
						<input
							onChange={setImageHandler}
							className='z-[-1] absolute h-[0.1px] w-[0.1px] overflow-hidden'
							accept='image/*'
							type='file'
							name='file'
							id='file'></input>
					</label>
				</div>
				<div className='mt-4 md:ml-4 md:mt-0'>
					{!isEditting && (
						<>
							<p className='font-semibold'>{user.name}</p>
							<p className='mt-1 text-neutral-700'>{user.email}</p>
						</>
					)}
					{isEditting && (
						<form onSubmit={formik.handleSubmit} className='w-full flex flex-col'>
							<label className='font-semibold' htmlFor='fname'>
								Name
							</label>
							<input
								className='autofill:bg-none  bg-white outline-none  registerInputs rounded-md pl-2 pr-2 p-1 mt-1'
								value={formik.values.fname}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								type='text'
								id='fname'
							/>
							<p className='text-xs text-red-400 mt-1'>{formik.errors.fname}</p>
						</form>
					)}
				</div>
				<div className='flex justify-center w-full mt-4 md:mt-0 md:ml-auto md:block md:w-auto'>
					{isEditting && (
						<button
							disabled={!(formik.dirty && formik.isValid)}
							onClick={saveChangesHandler}
							className={` text-white rounded-lg p-1 pl-4 pr-4 mr-2 transition-colors duration-200  ${
								!(formik.dirty && formik.isValid) ? 'bg-neutral-500' : 'bg-blue-700 duration-200 transition-colors hover:bg-blue-600 '
							}`}>
							Save
						</button>
					)}
					<button
						onClick={toggleEditHandler}
						className={`border rounded-lg p-1 pl-4 pr-4 duration-200 transition-colors  hover:text-white ${
							isEditting ? 'hover:bg-red-600' : 'hover:bg-blue-700'
						}`}>
						{isEditting ? 'Cancel' : 'Edit'}
					</button>
				</div>
			</div>
		</div>
	);
};

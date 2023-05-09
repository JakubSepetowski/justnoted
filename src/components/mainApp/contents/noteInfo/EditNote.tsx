import { Formik, Field, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { FormikValues, Note } from '../../../../types/types';
import { categories, categoryOptions } from '../../../common/categories';
import { currentDate } from '../../../common/date';
import { collection, updateDoc, doc } from 'firebase/firestore';
import { dataBase, auth } from '../../../../config/firebase';
import { useDispatch } from 'react-redux';
import { notesSlice } from '../../../../store/slices/notesSlice';
import { popupSlice } from '../../../../store/slices/popupSlice';
import { RefObject, useRef, useState } from 'react';
import { colors } from '../../../common/colors';
import { ColorsBtns } from '../../../common/ColorsBtns';
import { AnimatePresence, motion } from 'framer-motion';
import { calendarInputAnim } from '../../../../animations/animations';

interface Props {
	noteInfo: Note;
	onCloseEdit: (save: boolean) => void;
	onChangeColor: (currColor: string) => void;
}

export const EditNote = ({ noteInfo, onCloseEdit, onChangeColor }: Props) => {
	const dispatch = useDispatch();
	const [isSending, setIsSending] = useState(false);
	const formikRef: RefObject<FormikProps<FormikValues>> = useRef<FormikProps<FormikValues>>(null);

	const updateNoteHanlder = async (val: FormikValues) => {
		setIsSending(true);
		const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);
		const updateNote = {
			...noteInfo,
			title: val.title,
			note: val.note,
			category: val.category,
			calendar: val.calendar,
			date: val.date,
			fav: val.fav,
			color: val.color,
			lastTitle: noteInfo.title,
			lastNote: noteInfo.note,
			lastCategory: noteInfo.category,
			lastDate: noteInfo.date,
			lastFav: noteInfo.fav,
			lastCalendar: noteInfo.calendar,
			editatedDate: currentDate,
		};
		try {
			await updateDoc(doc(notesColection, noteInfo.id), updateNote);
			dispatch(notesSlice.actions.updateNote(updateNote));
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Note has been edited',
					success: true,
				})
			);
			onCloseEdit(true);
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Failed to edit note, try again',
					success: false,
				})
			);
		}
		setIsSending(false);
	};
	const closeEditHandler = () => {
		onCloseEdit(false);
	};
	const changeNoteColor = (selectedColor: string) => {
		console.log(selectedColor);
		const ref = formikRef.current;
		if (ref) {
			ref.setFieldValue('color', selectedColor);
			onChangeColor(selectedColor);
		}
	};

	return (
		<Formik
			innerRef={formikRef}
			initialValues={{
				title: noteInfo.title,
				note: noteInfo.note,
				category: noteInfo.category,
				date: noteInfo.date,
				calendar: noteInfo.calendar,
				fav: noteInfo.fav,
				color: noteInfo.color,
			}}
			validationSchema={Yup.object({
				title: Yup.string().required('Title is required').max(20, 'Title is to long').trim(),
				note: Yup.string().max(200, 'Note is to long').required('Note is required').trim(),
				category: Yup.string()
					.required('Please select a category')
					.oneOf(categories, 'Please select a category from list'),
				calendar: Yup.boolean(),
				fav: Yup.boolean(),
				date: Yup.date()
					.min(currentDate, 'Past date cannot be selected')
					.required('Please enter a valid date'),
			})}
			onSubmit={(values) => {
				updateNoteHanlder(values);
			}}>
			{(formik) => {
				return (
					<Form className='w-full h-full flex flex-col justify-between '>
						<div>
							<div className='flex flex-col'>
								<label
									className={`font-semibold ${
										formik.touched.title && formik.errors.title ? 'text-red-500' : ''
									}`}
									htmlFor='title'>
									{formik.touched.title && formik.errors.title ? formik.errors.title : 'Title'}
								</label>
								<Field
									className='bg-bgc mt-1 focus:outline-none p-1 md:p-2  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-100 registerInputs rounded-md '
									name='title'
									type='text'
								/>
							</div>
							<div className='flex flex-col mt-2 md:mt-4'>
								<label
									className={`font-semibold ${
										formik.touched.note && formik.errors.note ? 'text-red-500' : ''
									}`}
									htmlFor='note'>
									{formik.touched.note && formik.errors.note ? formik.errors.note : 'Note'}
								</label>
								<Field
									as='textarea'
									className='bg-bgc mt-1 min-h-[7rem] max-h-[7rem] focus:outline-none p-1 md:p-2  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-100 registerInputs rounded-md '
									name='note'
								/>
								<p
									className={`self-end mt-1 ${
										formik.touched.note && formik.values.note.length > 200 ? 'text-red-500' : ''
									}`}>
									{formik.values.note.length}/200
								</p>
							</div>
							<div className='flex flex-col mt-2 md:mt-4'>
								<label
									className={`font-semibold ${
										formik.touched.category && formik.errors.category ? 'text-red-500' : ''
									}`}
									htmlFor='category'>
									{formik.touched.category && formik.errors.category
										? formik.errors.category
										: 'Category'}
								</label>
								<Field
									as='select'
									className='bg-bgc mt-1  focus:outline-none p-1 md:p-2  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-100 registerInputs rounded-md '
									name='category'>
									<option disabled value={'0'}>
										Select a category
									</option>
									{categoryOptions}
								</Field>
							</div>
							<AnimatePresence initial={false}>
								{formik.values.calendar && (
									<motion.div
										key='calinput'
										initial='hidden'
										animate='visible'
										exit='exit'
										variants={calendarInputAnim}
										className='flex flex-col mt-2 md:mt-4'>
										<label
											className={`font-semibold ${
												formik.touched.date && formik.errors.date ? 'text-red-500' : ''
											}`}
											htmlFor='date'>
											{formik.touched.date && formik.errors.date ? formik.errors.date : 'Date'}
										</label>
										<Field
											className='bg-bgc mt-1 focus:outline-none p-1 md:p-2  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-100 registerInputs rounded-md '
											name='date'
											type='date'
										/>
									</motion.div>
								)}
							</AnimatePresence>

							<div className='flex flex-col mt-2 md:mt-4'>
								<label className='font-semibold ' htmlFor='color'>
									Choose color of note
									<div className='flex gap-2 mt-1'>
										{colors.map((color) => (
											<ColorsBtns
												key={color}
												currColor={formik.values.color}
												color={color}
												onChange={changeNoteColor}
											/>
										))}
									</div>
								</label>
							</div>
							<div className='flex flex-col mt-2 md:mt-4'>
								<div className='flex  items-center '>
									<Field name='calendar' className='' type='checkbox' />
									<label className='ml-2' htmlFor='calendar'>
										save note to calendar
									</label>
								</div>
								<div className='flex items-center '>
									<Field name='fav' type='checkbox' />
									<label className='ml-2' htmlFor='fav'>
										mark note as favourite
									</label>
								</div>
							</div>
						</div>
						<div className='flex mt-6'>
							{!isSending && (
								<>
									<button
										disabled={!(formik.dirty && formik.isValid)}
										type='submit'
										className={`w-24 rounded-md p-1  duration-200 transition-colors text-white ${
											!(formik.dirty && formik.isValid)
												? 'bg-neutral-500 '
												: `${formik.values.color} hover:scale-[1.02] transition-transform `
										}`}>
										Save
									</button>

									<button
										type='button'
										onClick={closeEditHandler}
										className='ml-2 border  w-24 rounded-md p-1  bg-transparent hover:bg-neutral-200 duration-200 transition-colors'>
										Cancel
									</button>
								</>
							)}
							{isSending && <p className='loading text-blue-700'>We edit your note, plase wait</p>}
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

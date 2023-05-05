import { Player } from '@lottiefiles/react-lottie-player';
import { ContentWrapper } from '../../common/ContentWrapper';
import writing from '../../../../assets/lotties/writing.json';
import { Field, Formik, Form } from 'formik';
import { collection, doc, setDoc } from 'firebase/firestore';
import * as Yup from 'yup';
import { auth, dataBase } from '../../../../config/firebase';
import { FormikValues, Note } from '../../../../types/types';
import { useDispatch } from 'react-redux';
import { notesSlice } from '../../../../store/notesSlice';
import { v4 as uuid } from 'uuid';
import { popupSlice } from '../../../../store/popupSlice';
import { H2 } from '../../common/H2';
import { categoryOptions, categories } from '../../common/categories';
import { currentDate } from '../../common/date';

export const NewNoteContent = () => {
	const dispatch = useDispatch();

	const onAddNote = async (values: FormikValues, id: string) => {
		const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);
		const newNote: Note = {
			id,
			title: values.title,
			note: values.note,
			category: values.category,
			date: values.date,
			createdAt: currentDate,
			fav: values.fav,
			calendar: values.calendar,
			inTrash: false,
			editatedDate: null,
			lastTitle: null,
			lastNote: null,
			lastCategory: null,
			lastFav: null,
			lastDate: null,
			lastCalendar: null,
		};
		try {
			await setDoc(doc(notesColection, id), newNote);
			dispatch(notesSlice.actions.addToNotes(newNote));
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Note has been added',
					success: true,
				})
			);
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Filed to add note, try again',
					success: false,
				})
			);
		}
	};

	return (
		<Formik
			initialValues={{
				title: '',
				note: '',
				category: '0',
				date: currentDate,
				calendar: false,
				fav: false,
			}}
			validationSchema={Yup.object({
				title: Yup.string().required('Title is required').max(20, 'Title is too long').trim(),
				note: Yup.string().max(200, 'Note is too long').required('Note is required').trim(),
				category: Yup.string()
					.required('Please select a category')
					.oneOf(categories, 'Please select a category from list'),
				calendar: Yup.boolean(),
				fav: Yup.boolean(),
				date: Yup.date()
					.min(currentDate, 'Past date cannot be selected')
					.required('Please enter a valid date'),
			})}
			onSubmit={(values, { resetForm }) => {
				const unique_id = uuid();
				onAddNote(values, unique_id);
				resetForm();
			}}>
			{(formik) => {
				return (
					<ContentWrapper hasHeader={false}>
						<div className=' h-full flex flex-col md:flex-row justify-center items-center lg:justify-between  overflow-hidden'>
							<Form className='w-full md:w-1/2 text-sm md:text-base '>
								<H2 title='Add new!' />
								<div className='flex flex-col mt-4'>
									<label
										className={`font-semibold ${
											formik.touched.title && formik.errors.title ? 'text-red-500' : ''
										}`}
										htmlFor='title'>
										{formik.touched.title && formik.errors.title ? formik.errors.title : 'Title'}
									</label>
									<Field
										className='mt-1 autofill:bg-none bg-zinc-200 focus:outline-none p-1 md:p-2 placeholder:text-neutral-500 transition-colors duration-200 focus:bg-zinc-300 registerInputs rounded-md '
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
										className='mt-1 autofill:bg-none min-h-[2rem] md:min-h-[5rem] max-h-24 md:max-h-64 bg-zinc-200 focus:outline-none p-1 md:p-2  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-zinc-300 registerInputs rounded-md'
										name='note'
										as='textarea'
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
										className='mt-1 autofill:bg-none bg-zinc-200  focus:outline-none p-1  md:p-2 placeholder:text-neutral-500 transition-colors duration-200 focus:bg-zinc-300  registerInputs rounded-md'
										name='category'>
										<option disabled value={'0'}>
											Select a category
										</option>
										{categoryOptions}
									</Field>
								</div>
								{formik.values.calendar && (
									<div className='flex flex-col mt-2 md:mt-4'>
										<label
											className={`mt-1 font-semibold ${
												formik.touched.date && formik.errors.date ? 'text-red-500' : ''
											}`}
											htmlFor='date'>
											{formik.touched.date && formik.errors.date ? formik.errors.date : 'Date'}
										</label>
										<Field
											className='mt-1 autofill:bg-none bg-zinc-200  focus:outline-none p-1 md:p-2  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-zinc-300  registerInputs rounded-md'
											name='date'
											type='date'
										/>
									</div>
								)}

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
								<div className='mt-4 md:mt-8'>
									<button
										disabled={!(formik.dirty && formik.isValid)}
										type='submit'
										className={`w-24 md:w-32 rounded-md p-1 md:p-2 duration-200 transition-colors text-white ${
											!(formik.dirty && formik.isValid)
												? 'bg-neutral-500 '
												: ' bg-blue-700 hover:bg-blue-600 '
										}`}>
										Add
									</button>
									<button
										type='reset'
										className='ml-4 md:ml-6 w-24 md:w-32 border  p-1 rounded-md  md:p-2 bg-transparent hover:bg-neutral-200 duration-200 transition-colors '>
										Clear
									</button>
								</div>
							</Form>
							<div className='hidden sm:block md:w-1/2'>
								<Player
									src={writing}
									className='w-3/4 md:w-full max-w-sm lg:max-w-md'
									loop
									autoplay
								/>
							</div>
						</div>
					</ContentWrapper>
				);
			}}
		</Formik>
	);
};

import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'formik';
import { updateDoc, doc, collection } from 'firebase/firestore';
import { dataBase, auth } from '../../../../config/firebase';
import * as Yup from 'yup';
import { RootState } from '../../../../store/store';
import { homeNotesSlice } from '../../../../store/slices/homeNotesSlice';
import { popupSlice } from '../../../../store/slices/popupSlice';
import { HomeNotesNames } from '../../../../types/types';
interface Props {
	name: string;
	desc: string;
	onClose: () => void;
}

export const Edit = ({ name, desc, onClose }: Props) => {
	const dispatch = useDispatch();
	const id = useSelector((state: RootState) => state.homeNotes.id);

	const updateNoteHandler = async (val: string) => {
		const homeNotesColection = collection(dataBase, `users/${auth.currentUser?.uid}/home`);

		try {
			if (name === HomeNotesNames.importantNote) {
				await updateDoc(doc(homeNotesColection, id), { importantNoteDesc: val });
				dispatch(homeNotesSlice.actions.changeImportantDesc({ desc: val }));
			}

			if (name === HomeNotesNames.quickNote) {
				await updateDoc(doc(homeNotesColection, id), { quicktNoteDesc: val });
				dispatch(homeNotesSlice.actions.changeQuickDesc({ desc: val }));
			}
		} catch {
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Filed to save data in cloud, try again',
					success: false,
				})
			);
		}

		onClose();
	};

	return (
		<Formik
			initialValues={{
				edit: desc,
			}}
			validationSchema={Yup.object({
				edit: Yup.string()
					.max(300, 'Note is too long')
					.required('You cannot add empty note')
					.trim(),
			})}
			onSubmit={(values, { resetForm }) => {
				updateNoteHandler(values.edit);
			}}>
			{(formik) => {
				return (
					<Form className='w-full '>
						<Field
							name='edit'
							as='textarea'
							className='bg-bgc w-full min-h-[5rem] max-h-28 focus:outline-none p-1 md:p-2  placeholder:text-neutral-500 transition-colors duration-200 focus:bg-blue-100 registerInputs rounded-md'
						/>

						<div className='w-full flex flex-col-reverse items-center md:flex-row md:justify-between mt-1 md:mt-2 text-sm md:text-base'>
							<div className='mt-3 md:mt-0 flex flex-col w-full md:w-auto md:flex-row'>
								<button
									type='submit'
									className=' text-white bg-blue-700 rounded-md p-1 pl-2 pr-2 duration-200 transition-colors hover:bg-blue-600 '>
									Save
								</button>
								<button
									onClick={onClose}
									className='md:ml-2 mt-2 md:mt-0 text-white bg-neutral-500 rounded-md p-1 pl-2 pr-2  duration-200 transition-colors hover:bg-neutral-400'
									type='button'>
									Cancel
								</button>
							</div>
							<div className='flex flex-row self-end md:self-auto '>
								{formik.errors.edit && <p className=' text-red-400'>{formik.errors.edit}</p>}
								<p className={`${formik.values.edit.length > 300 ? 'text-red-400' : ''} ml-2`}>
									{formik.values.edit.length}/300
								</p>
							</div>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

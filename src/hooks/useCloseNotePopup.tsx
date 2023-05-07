import { useDispatch, useSelector } from 'react-redux';
import { notePopupSlice } from '../store/slices/notePopupSlice';
import { RootState } from '../store/store';
import { useEffect } from 'react';

export const useCloseNotePopup = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector((state: RootState) => state.notesPopup.isOpen);

	useEffect(() => {
		if (isOpen) dispatch(notePopupSlice.actions.closePopup());
	}, []);
};

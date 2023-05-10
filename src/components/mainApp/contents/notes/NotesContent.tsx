import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ContentWrapper } from '../../../common/ContentWrapper';
import { NoteCrad } from './NoteCard';
import { Empty } from './Empty';
import { useState } from 'react';
import { Paginate } from './Paginate';
import { Sorting, SortingOptions } from '../../../../types/types';
import { DeafultNotesContentBtns } from './DeafultNotesContentBtns';
import { DeleteAllBtn } from './DeleteAllBtn';
import { popupSlice } from '../../../../store/slices/popupSlice';
import { H2 } from '../../../common/H2';
import { AnimatePresence, motion } from 'framer-motion';
import { fromRigthAnim, opacityAnim } from '../../../../animations/animations';
import { DeleteAllPopup } from './DeleteAllPopup';

interface Props {
	isTrashSite: boolean;
}

export const NotesContent = ({ isTrashSite }: Props) => {
	const dispatch = useDispatch();
	const notes = useSelector((state: RootState) => state.notes.notes);

	let trashedNotes = notes.filter((note) => note.inTrash === false);
	if (isTrashSite) trashedNotes = notes.filter((note) => note.inTrash === true);

	const [currentPage, setCurrentPage] = useState(1);
	const [notesPerPage] = useState(4);

	const [isPopupOpen, setIsPopOpen] = useState(false);
	const [agreedToRemoveAll, setAgreedToRemoveAll] = useState(false);

	const [searchTerm, setSearchTerm] = useState('');
	const [selectedNoteCategory, setSelectedNoteCategory] = useState('');
	const [currentSortingCategory, setCurrentSortingCategory] = useState('');

	const indexOfLastNote = currentPage * notesPerPage;
	const indexOfFirstNote = indexOfLastNote - notesPerPage;

	const sorting = (sortBy: string) => {
		switch (sortBy) {
			case Sorting.category: {
				const sortedNotes = trashedNotes.filter(
					(note) =>
						note.title.toLocaleLowerCase().includes(searchTerm) &&
						(selectedNoteCategory === '' || note.category === selectedNoteCategory)
				);
				return sortedNotes;
			}
			case Sorting.fav: {
				const sortedNotes = trashedNotes.filter(
					(note) => note.title.toLocaleLowerCase().includes(searchTerm) && note.fav === true
				);
				return sortedNotes;
			}
			case Sorting.calendar: {
				const sortedNotes = trashedNotes.filter(
					(note) => note.title.toLocaleLowerCase().includes(searchTerm) && note.calendar === true
				);
				return sortedNotes;
			}
			case Sorting.latest: {
				const sortedNotes = [...trashedNotes].sort((noteA, noteB) => {
					const dateA = new Date(noteA.createdAt);
					const dateB = new Date(noteB.createdAt);
					return dateB.getTime() - dateA.getTime();
				});
				return sortedNotes.filter((note) => note.title.toLocaleLowerCase().includes(searchTerm));
			}
			case Sorting.oldest: {
				const sortedNotes = [...trashedNotes].sort((noteA, noteB) => {
					const dateA = new Date(noteA.createdAt);
					const dateB = new Date(noteB.createdAt);
					return dateA.getTime() - dateB.getTime();
				});
				return sortedNotes.filter((note) => note.title.toLocaleLowerCase().includes(searchTerm));
			}

			default:
				const sortedNotes = trashedNotes.filter((note) =>
					note.title.toLocaleLowerCase().includes(searchTerm)
				);
				return sortedNotes;
		}
	};

	const filteredNotes = sorting(currentSortingCategory);

	const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

	const closePopupHandler = () => {
		setIsPopOpen(false);
	};
	const openPopupHandler = () => {
		setIsPopOpen(true);
	};
	const resetAgreeToRemoveHandler = () => {
		closePopupHandler();
		setAgreedToRemoveAll(false);
	};

	const onPaginateHanlder = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	const onNextPageHanlder = () => {
		setCurrentPage(currentPage + 1);
	};

	const onPrevPageHanlder = () => {
		setCurrentPage(currentPage - 1);
	};

	const filterByTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (notes.length > 0 && trashedNotes.length === 0) return;
		setCurrentPage(1);
		setSearchTerm(e.target.value.toLowerCase());
	};

	const filterByCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (notes.length > 0 && trashedNotes.length === 0) return;
		setSelectedNoteCategory(e.target.value);
		setCurrentPage(1);
		const selectedValue = e.target.value;
		switch (selectedValue) {
			case SortingOptions.latest:
				setCurrentSortingCategory(Sorting.latest);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting form the latest',
						success: true,
					})
				);
				break;
			case SortingOptions.oldest:
				setCurrentSortingCategory(Sorting.oldest);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting form the oldest',
						success: true,
					})
				);
				break;
			case SortingOptions.fav:
				setCurrentSortingCategory(Sorting.fav);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Showing only favourites',
						success: true,
					})
				);
				break;
			case SortingOptions.calendar:
				setCurrentSortingCategory(Sorting.calendar);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Showing only saved in calendar',
						success: true,
					})
				);
				break;
			case SortingOptions.home:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "Home" category',
						success: true,
					})
				);
				break;
			case SortingOptions.shopping:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "Shopping" category',
						success: true,
					})
				);

				break;
			case SortingOptions.finance:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "Finance" category',
						success: true,
					})
				);

				break;
			case SortingOptions.health:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "Health" category',
						success: true,
					})
				);

				break;
			case SortingOptions.hobby:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "Hobby" category',
						success: true,
					})
				);

				break;
			case SortingOptions.study:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "Study" category',
						success: true,
					})
				);

				break;
			case SortingOptions.work:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "Work" category',
						success: true,
					})
				);

				break;
			default:
				setCurrentSortingCategory('');
				setSelectedNoteCategory('');
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Default view',
						success: true,
					})
				);
		}
	};

	return (
		<ContentWrapper hasHeader={false}>
			<div className=' h-full flex flex-col relative '>
				<div className='md:h-1/6  pt-8 md:pt-0 md:p-0  w-full flex flex-col md:flex-row items-center md:justify-around '>
					{isTrashSite && <H2 title='Your Trash' />}
					{!isTrashSite && <H2 title='Your Notes' />}

					<motion.div
						variants={fromRigthAnim}
						className='flex flex-col md:flex-row w-full md:w-auto text-sm lg:text-base'>
						<input
							disabled={trashedNotes.length === 0}
							onChange={filterByTitleHandler}
							placeholder='Search notes by title'
							className='w-full p-1 mt-2 md:mt-0 md:mr-2 md:w-32 lg:w-52 rounded-md'
							type='text'
						/>
						<select
							disabled={trashedNotes.length === 0}
							onChange={filterByCategoryHandler}
							className='w-full p-1 md:w-24 lg:w-36 mt-2 md:mt-0 md:mr-4 lg:mr-8 rounded-md'
							name='filter'>
							<option value=''>Sort by</option>
							<option value={SortingOptions.latest}>The lates</option>
							<option value={SortingOptions.oldest}>From the oldest</option>
							<option value={SortingOptions.fav}>Favourites</option>
							<option value={SortingOptions.calendar}>Save in calendar</option>
							<option value={SortingOptions.shopping}>Shopping</option>
							<option value={SortingOptions.home}>Home</option>
							<option value={SortingOptions.work}>Work</option>
							<option value={SortingOptions.study}>Study</option>
							<option value={SortingOptions.hobby}>Hobby</option>
							<option value={SortingOptions.finance}>Finance</option>
							<option value={SortingOptions.health}>Health</option>
						</select>
						{!isTrashSite && <DeafultNotesContentBtns length={trashedNotes.length} />}
						{isTrashSite && (
							<DeleteAllBtn length={trashedNotes.length} onPopupOpen={openPopupHandler} />
						)}
					</motion.div>
				</div>
				<div className='h-4/6 md:h-5/6 w-full flex flex-col justify-between'>
					<div className=' h-full flex flex-col md:flex-row justify-center md:items-center flex-wrap gap-5 overflow-x-auto noscroll'>
						<AnimatePresence>
							{trashedNotes.length === 0 && <Empty isTrash={isTrashSite} />}
							{trashedNotes.length > 0 && filteredNotes.length === 0 && (
								<motion.p
									layout
									key='noFoundP'
									variants={opacityAnim}
									initial='hidden'
									animate='visible'
									exit='exit'
									className='text-center'>
									Nothing found for your query
								</motion.p>
							)}
							{currentNotes.map(
								(note) =>
									!isTrashSite &&
									!note.inTrash && (
										<NoteCrad
											key={note.id}
											title={note.title}
											category={note.category}
											note={note.note}
											date={note.date}
											createdAt={note.createdAt}
											id={note.id}
											fav={note.fav}
											calendar={note.calendar}
											inTrash={false}
											color={note.color}
										/>
									)
							)}
							{currentNotes.map(
								(note) =>
									isTrashSite &&
									note.inTrash && (
										<NoteCrad
											key={note.id}
											title={note.title}
											category={note.category}
											note={note.note}
											date={note.date}
											createdAt={note.createdAt}
											id={note.id}
											fav={note.fav}
											calendar={note.calendar}
											inTrash={true}
											color={note.color}
										/>
									)
							)}
						</AnimatePresence>
					</div>
					{filteredNotes.length > 4 && (
						<Paginate
							currentPage={currentPage}
							onNext={onNextPageHanlder}
							onPrev={onPrevPageHanlder}
							onPaginate={onPaginateHanlder}
							notesPerPage={notesPerPage}
							totalNotes={filteredNotes.length}
						/>
					)}
				</div>
				<AnimatePresence>
					{isTrashSite && isPopupOpen && (
						<DeleteAllPopup onReset={resetAgreeToRemoveHandler} onClosePopup={closePopupHandler} />
					)}
				</AnimatePresence>
			</div>
		</ContentWrapper>
	);
};

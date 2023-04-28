import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ContentWrapper } from '../../common/ContentWrapper';
import { NoteCrad } from './NoteCard';
import { Empty } from './Empty';
import { useState } from 'react';
import { Paginate } from './Paginate';
import { Sorting, SortingOptions } from '../../../../types/types';
import { DeafultNotesContentBtns } from './DeafultNotesContentBtns';
import { DeleteAllBtn } from './DeleteAllBtn';
import { popupSlice } from '../../../../store/popupSlice';

interface Props {
	isTrashSite: boolean;
}

export const NotesContent = ({ isTrashSite }: Props) => {
	const dispatch= useDispatch()
	const notes = useSelector((state: RootState) => state.notes.notes);

	let trashedNotes = notes.filter((note) => note.inTrash === false);
	if (isTrashSite) trashedNotes = notes.filter((note) => note.inTrash === true);

	const [currentPage, setCurrentPage] = useState(1);
	const [notesPerPage] = useState(4);

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
						message: 'Showing only saved in callendar',
						success: true,
					})
				);
				break;
			case SortingOptions.home:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "home" category',
						success: true,
					})
				);
				break;
			case SortingOptions.shopping:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				dispatch(
					popupSlice.actions.openPopup({
						message: 'Sorting by "shopping" category',
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
			<div className=' h-full flex flex-col '>
				<div className='md:h-1/6  pt-8 md:pt-0 md:p-0  w-full flex flex-col md:flex-row items-center md:justify-around '>
					{isTrashSite && (
						<h2 className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>Your Trash</h2>
					)}
					{!isTrashSite && (
						<h2 className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>Your Notes</h2>
					)}

					<div className='flex flex-col md:flex-row w-full md:w-auto text-sm lg:text-base'>
						<input
							onChange={filterByTitleHandler}
							placeholder='Search notes by title'
							className='w-full p-1 mt-2 md:mt-0 md:mr-2 md:w-32 lg:w-52 rounded-md'
							type='text'
						/>
						<select
							onChange={filterByCategoryHandler}
							className='w-full p-1 md:w-24 lg:w-36 mt-2 md:mt-0 md:mr-4 lg:mr-8 rounded-md'
							name='filter'>
							<option value=''>Sort by</option>
							<option value={SortingOptions.latest}>The lates</option>
							<option value={SortingOptions.oldest}>From the oldest</option>
							<option value={SortingOptions.fav}>Favourites</option>
							<option value={SortingOptions.calendar}>Save in calendar</option>
							<option value={SortingOptions.home}>Home</option>
							<option value={SortingOptions.shopping}>Shopping</option>
						</select>
						{!isTrashSite && <DeafultNotesContentBtns length={trashedNotes.length} />}
						{isTrashSite && <DeleteAllBtn length={trashedNotes.length} />}
					</div>
				</div>
				<div className='h-4/6 md:h-5/6 w-full flex flex-col justify-between'>
					<div className=' h-full flex flex-col md:flex-row justify-center md:items-center flex-wrap gap-5 overflow-scroll noscroll '>
						{trashedNotes.length === 0 && <Empty isTrash={isTrashSite} />}
						{trashedNotes.length > 0 && filteredNotes.length === 0 && <p>Nothing found for your query</p>}
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
									/>
								)
						)}
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
			</div>
		</ContentWrapper>
	);
};

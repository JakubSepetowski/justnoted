import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ContentWrapper } from '../../common/ContentWrapper';
import { NoteCrad } from './NoteCard';
import { Empty } from './Empty';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Paginate } from './Paginate';
import { Sorting, SortingOptions } from '../../../../types/types';
import { notesSlice } from '../../../../store/notesSlice';
import { doc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { dataBase, auth } from '../../../../config/firebase';

export const NotesContent = () => {
	const disptach = useDispatch();
	const notes = useSelector((state: RootState) => state.notes.notes);

	const notesColection = collection(dataBase, `users/${auth.currentUser?.uid}/notes`);

	const trashedNotes = notes.filter((note) => note.inTrash === false);
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
				const filteredNotes = notes.filter(
					(note) =>
						note.title.toLocaleLowerCase().includes(searchTerm) &&
						(selectedNoteCategory === '' || note.category === selectedNoteCategory)
				);
				return filteredNotes;
			}
			case Sorting.fav: {
				const filteredNotes = notes.filter(
					(note) => note.title.toLocaleLowerCase().includes(searchTerm) && note.fav === true
				);
				return filteredNotes;
			}
			case Sorting.calendar: {
				const filteredNotes = notes.filter(
					(note) => note.title.toLocaleLowerCase().includes(searchTerm) && note.calendar === true
				);
				return filteredNotes;
			}
			case Sorting.latest: {
				const sortedNotes = [...notes].sort((noteA, noteB) => {
					const dateA = new Date(noteA.createdAt);
					const dateB = new Date(noteB.createdAt);
					return dateB.getTime() - dateA.getTime();
				});
				return sortedNotes.filter((note) => note.title.toLocaleLowerCase().includes(searchTerm));
			}
			case Sorting.oldest: {
				const sortedNotes = [...notes].sort((noteA, noteB) => {
					const dateA = new Date(noteA.createdAt);
					const dateB = new Date(noteB.createdAt);
					return dateA.getTime() - dateB.getTime();
				});
				return sortedNotes.filter((note) => note.title.toLocaleLowerCase().includes(searchTerm));
			}

			default:
				const filteredNotes = notes.filter((note) =>
					note.title.toLocaleLowerCase().includes(searchTerm)
				);
				return filteredNotes;
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
				break;
			case SortingOptions.oldest:
				setCurrentSortingCategory(Sorting.oldest);
				break;
			case SortingOptions.fav:
				setCurrentSortingCategory(Sorting.fav);
				break;
			case SortingOptions.calendar:
				setCurrentSortingCategory(Sorting.calendar);
				break;
			case SortingOptions.home:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				break;
			case SortingOptions.shopping:
				setCurrentSortingCategory(Sorting.category);
				setSelectedNoteCategory(selectedValue);
				break;
			default:
				setCurrentSortingCategory('');
				setSelectedNoteCategory('');
		}
	};

	const trashAllHandler = () => {
		disptach(notesSlice.actions.trashAll());
		notes.forEach(async (note) => {
			await updateDoc(doc(notesColection, note.id), { inTrash: true });
		});
	};
	return (
		<ContentWrapper hasHeader={false}>
			<div className=' h-full flex flex-col '>
				<div className='md:h-1/6  pt-8 md:pt-0 md:p-0  w-full flex flex-col md:flex-row items-center md:justify-around '>
					<h2 className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl'>Your Notes</h2>
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
						<div className=' flex mt-2 md:mt-0 '>
							<Link
								to='/app/new'
								className='p-1 md:w-auto lg:w-32 w-full md:mr-2 bg-blue-700 text-white rounded-l-md md:rounded-md flex  justify-center items-center'>
								Add new
							</Link>
							<button
								onClick={trashAllHandler}
								className='p-1 md:w-auto lg:w-32 w-full border rounded-r-md md:rounded-md'>
								Trash all
							</button>
						</div>
					</div>
				</div>
				<div className='h-4/6 md:h-5/6 w-full flex flex-col justify-between'>
					<div className=' h-full flex flex-col md:flex-row justify-center md:items-center flex-wrap gap-5 overflow-scroll noscroll '>
						{notes.length === 0 && <Empty />}
						{notes.length > 0 && trashedNotes.length === 0 && <Empty />}
						{notes.length > 0 && filteredNotes.length === 0 && <p>Nothing found for your query</p>}
						{currentNotes.map(
							(note) =>
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

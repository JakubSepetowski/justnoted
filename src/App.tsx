import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { RegisterPage } from './pages/home/RegisterPage';
import { LoginPage } from './pages/home/LoginPage';
import { MainAppPage } from './pages/mainApp/MainAppPage';
import { NotesPage } from './pages/mainApp/NotesPage';
import { RequireAuth } from './components/auth/RequireAuth';
import { NewNotePage } from './pages/mainApp/NewNotePage';
import { useDispatch } from 'react-redux';
import { notesSlice } from './store/slices/notesSlice';
import { query, collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, dataBase } from './config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { getData, LocalStorage } from './types/types';
import { NoteInfoPage } from './pages/mainApp/NoteInfoPage';
import { TrashPage } from './pages/mainApp/TrashPage';
import { popupSlice } from './store/slices/popupSlice';
import { ProfilePage } from './pages/mainApp/ProfilePage';
import { homeNotesSlice } from './store/slices/homeNotesSlice';
import { CalendarPage } from './pages/mainApp/CalendarPage';
import { ErrorPage } from './pages/ErrorPage';

const router = createBrowserRouter([
	{
		errorElement: <ErrorPage />,
	},
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/app/home',
		element: (
			<RequireAuth>
				<MainAppPage />
			</RequireAuth>
		),
	},
	{
		path: '/app/new',
		element: (
			<RequireAuth>
				<NewNotePage />
			</RequireAuth>
		),
	},
	{
		path: '/app/notes',
		element: (
			<RequireAuth>
				<NotesPage />
			</RequireAuth>
		),
	},
	{
		path: '/app/notes/note/:noteId',
		element: (
			<RequireAuth>
				<NoteInfoPage />
			</RequireAuth>
		),
	},
	{
		path: '/app/trash',
		element: (
			<RequireAuth>
				<TrashPage />
			</RequireAuth>
		),
	},
	{
		path: '/app/profile',
		element: (
			<RequireAuth>
				<ProfilePage />
			</RequireAuth>
		),
	},
	{
		path: '/app/calendar',
		element: (
			<RequireAuth>
				<CalendarPage />
			</RequireAuth>
		),
	},
]);

export const App = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state: RootState) => state.authentication.isAuth);
	const isOpen = useSelector((state: RootState) => state.popup.isOpen);

	const user: LocalStorage = JSON.parse(localStorage.getItem('user')!);

	async function getData<T extends getData>(pathName: string) {
		try {
			const q = query(collection(dataBase, `users/${user.uid}/${pathName}`));
			const data = await getDocs(q);
			const filteredData = data.docs.map((doc) => ({
				...(doc.data() as T),
			}));

			if (pathName === 'notes') dispatch(notesSlice.actions.initNotes(filteredData));
			if (pathName === 'home') {
				const imortantNote = filteredData[0].importantNoteDesc;
				const quickNote = filteredData[0].quicktNoteDesc;

				dispatch(
					homeNotesSlice.actions.initState({
						id: filteredData[0].id,
						importantDesc: imortantNote,
						quickDesc: quickNote,
					})
				);
			}
		} catch {
			if (pathName === 'notes') dispatch(notesSlice.actions.initNotes([]));
			if (pathName === 'home') {
				dispatch(
					homeNotesSlice.actions.initState({
						id: '',
						importantDesc: '',
						quickDesc: '',
					})
				);
			}
			dispatch(
				popupSlice.actions.openPopup({
					message: 'Filed to get data, try to reload page',
					success: false,
				})
			);
		}
	}

	useEffect(() => {
		if (!isAuth) return;
		getData('notes');

		getData('home');
	}, [isAuth]);

	useEffect(() => {
		if (!isOpen) return;
		const timer = setTimeout(() => {
			dispatch(popupSlice.actions.closePopup());
		}, 2700);

		return () => clearTimeout(timer);
	}, [isOpen]);

	return <RouterProvider router={router} />;
};

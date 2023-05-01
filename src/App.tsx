import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { RegisterPage } from './pages/home/RegisterPage';
import { LoginPage } from './pages/home/LoginPage';
import { MainAppPage } from './pages/mainApp/MainAppPage';
import { NotesPage } from './pages/mainApp/NotesPage';
import { RequireAuth } from './components/auth/RequireAuth';
import { NewNotePage } from './pages/mainApp/NewNotePage';
import { useDispatch } from 'react-redux';
import { notesSlice } from './store/notesSlice';
import { query, collection, getDocs } from 'firebase/firestore';
import { useEffect } from 'react';
import { auth, dataBase } from './config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { LocalStorage, Note } from './types/types';
import { NoteInfoPage } from './pages/mainApp/NoteInfoPage';
import { TrashPage } from './pages/mainApp/TrashPage';
import { popupSlice } from './store/popupSlice';
import { ProfilePage } from './pages/mainApp/ProfilePage';

const router = createBrowserRouter([
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
]);

export const App = () => {
	const isAuth = useSelector((state: RootState) => state.authentication.isAuth);
	const isOpen = useSelector((state: RootState) => state.popup.isOpen);
	const dispatch = useDispatch();

	const getNotes = async () => {
		const user: LocalStorage = JSON.parse(localStorage.getItem('user')!);

		try {
			const q = query(collection(dataBase, `users/${user.uid}/notes`));
			const data = await getDocs(q);
			const filteredData = data.docs.map((doc) => ({
				...(doc.data() as Note),
			}));
			console.log(filteredData);
			dispatch(notesSlice.actions.initNotes(filteredData));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (isAuth) getNotes();
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

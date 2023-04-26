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
import { dataBase } from './config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { Note } from './types/types';
import { NotePage } from './pages/mainApp/NotePage';

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
				<NotePage />
			</RequireAuth>
		),
	},
]);

export const App = () => {
	const isAuth = useSelector((state: RootState) => state.authentication.isAuth);
	const dispatch = useDispatch();

	const getNotes = async () => {
		const user = JSON.parse(localStorage.getItem('user')!);
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

	return <RouterProvider router={router} />;
};

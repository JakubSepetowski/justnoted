import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { RegisterPage } from './pages/home/RegisterPage';
import { LoginPage } from './pages/home/LoginPage';
import { MainAppPage } from './pages/mainApp/MainAppPage';
import { NotesPage } from './pages/mainApp/NotesPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: 'register',
		element: <RegisterPage />,
	},
	{
		path: 'login',
		element: <LoginPage />,
	},
	{
		path: '/app/home',
		element: <MainAppPage />,
	},
	{
		path: '/app/notes',
		element: <NotesPage />,
	},
]);

export const App = () => {
	return <RouterProvider router={router} />;
};

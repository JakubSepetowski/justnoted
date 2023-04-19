import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { RegisterPage } from './pages/home/RegisterPage';
import { LoginPage } from './pages/home/LoginPage';
import { MainAppPage } from './pages/mainApp/MainAppPage';
import { NotesPage } from './pages/mainApp/NotesPage';
import { RequireAuth } from './components/auth/RequireAuth';


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
		path: '/app/notes',
		element: (
			<RequireAuth>
				{' '}
				<NotesPage />
			</RequireAuth>
		),
	},
]);

export const App = () => {
	
	return <RouterProvider router={router} />;
};

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/home/HomePage';
import { RegisterPage } from './pages/home/RegisterPage';
import { LoginPage } from './pages/home/LoginPage';
import { MainAppPage } from './pages/mainApp/MainAppPage';

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
]);

export const App = () => {
	return <RouterProvider router={router} />;
};

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

export const useNavigateOnAuth = () => {
	const navgiate = useNavigate();
	const isAuth = useSelector((state: RootState) => state.authentication.isAuth);

	useEffect(() => {
		if (isAuth) {
			navgiate('/app/home');
		}
	}, [isAuth]);
};

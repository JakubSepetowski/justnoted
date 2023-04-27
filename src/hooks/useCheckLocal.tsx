import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSlice } from '../store/authSlice';

export const useCheckLocal = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		const userJSON = localStorage.getItem('user');
		if (userJSON !== null) {
			dispatch(authSlice.actions.setIsAuth());
			navigate('/app/home');
		}
	}, []);
};

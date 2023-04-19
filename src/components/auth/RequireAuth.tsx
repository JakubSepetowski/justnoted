import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
}

export const RequireAuth = ({ children }: Props) => {
	const isAuth = useSelector((state: RootState) => state.authentication.isAuth);
	return isAuth ? <>{children}</> : <Navigate to='/login' />;
};

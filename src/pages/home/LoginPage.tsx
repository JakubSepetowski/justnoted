import { Link } from 'react-router-dom';
import { LoginHeader } from '../../components/auth/login/LoginHeader';
import { useCheckLocal } from '../../hooks/useCheckLocal';

export const LoginPage = () => {
	useCheckLocal();
	return (
		<>
			<LoginHeader /> <Link to='/app/home'>App view</Link>
		</>
	);
};

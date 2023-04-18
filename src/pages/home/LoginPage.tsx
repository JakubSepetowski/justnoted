import { Link } from 'react-router-dom';
import { LoginHeader } from '../../components/home/login/LoginHeader';

export const LoginPage = () => {
	return (
		<>
			<LoginHeader /> <Link to='/app/home'>App view</Link>
		</>
	);
};

import { RegisterHeader } from '../../components/auth/register/RegisterHeader';
import { useCheckLocal } from '../../hooks/useCheckLocal';

export const RegisterPage = () => {
	useCheckLocal();
	return <RegisterHeader />;
};

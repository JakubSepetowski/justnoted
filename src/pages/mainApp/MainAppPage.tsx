import { Container } from '../../components/mainApp/Container';
import { HomeContent } from '../../components/mainApp/contents/HomeContent';
import { HomeHeader } from '../../components/mainApp/headers/HomeHeader';


export const MainAppPage = () => {
	return (
		<Container>
			<HomeHeader />
			<HomeContent />
		</Container>
	);
};

import { Container } from '../../components/mainApp/Container';
import { HomeContent } from '../../components/mainApp/contents/home/HomeContent';
import { HomeHeader } from '../../components/mainApp/headers/HomeHeader';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const MainAppPage = () => {
	useCloseNotePopup()
	return (
		<Container>
			<HomeHeader />
			<HomeContent />
		</Container>
	);
};

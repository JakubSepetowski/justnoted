import { Container } from '../../components/mainApp/Container';
import { NotesContent } from '../../components/mainApp/contents/NotesContent';
import { NotesHeader } from '../../components/mainApp/headers/NotesHeader';

export const NotesPage = () => {
	return (
		<Container>
			<NotesHeader />
			<NotesContent/>
		</Container>
	);
};

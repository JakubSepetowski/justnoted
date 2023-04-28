import { Container } from '../../components/mainApp/Container';
import { NotesContent } from '../../components/mainApp/contents/notes/NotesContent';
import { TrashContent } from '../../components/mainApp/contents/trash/TrashContent';

export const TrashPage = () => {
	return (
		<Container>
			<NotesContent isTrashSite={true} />
		</Container>
	);
};

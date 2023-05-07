import { Container } from '../../components/mainApp/Container';
import { NotesContent } from '../../components/mainApp/contents/notes/NotesContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const NotesPage = () => {
	useCloseNotePopup()
	return (
		<Container>
			<NotesContent isTrashSite={false} />
		</Container>
	);
};

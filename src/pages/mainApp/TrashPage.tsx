import { Container } from '../../components/mainApp/Container';
import { NotesContent } from '../../components/mainApp/contents/notes/NotesContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const TrashPage = () => {
	useCloseNotePopup();
	return (
		<Container>
			<NotesContent isTrashSite={true} />
		</Container>
	);
};

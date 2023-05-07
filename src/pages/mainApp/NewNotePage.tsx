import { Container } from '../../components/mainApp/Container';
import { NewNoteContent } from '../../components/mainApp/contents/newNote/NewNoteContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const NewNotePage = () => {
	useCloseNotePopup()
	return (
		<Container>
			<NewNoteContent />
		</Container>
	);
};

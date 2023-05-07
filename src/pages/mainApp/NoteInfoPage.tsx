import { Container } from "../../components/mainApp/Container";
import { NoteInfoContent } from "../../components/mainApp/contents/noteInfo/NoteInfoContent";
import { useCloseNotePopup } from "../../hooks/useCloseNotePopup";

export const NoteInfoPage = () => {
	useCloseNotePopup()
    return (
		<Container>
			<NoteInfoContent/>
		</Container>
	);
}
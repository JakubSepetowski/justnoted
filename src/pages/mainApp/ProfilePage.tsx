import { Container } from "../../components/mainApp/Container";
import { ProfileContent } from "../../components/mainApp/contents/profile/ProfileContent";
import { useCloseNotePopup } from "../../hooks/useCloseNotePopup";

export const ProfilePage = () => {
	useCloseNotePopup()
    return (
		<Container>
			<ProfileContent/>
		</Container>
	);
}
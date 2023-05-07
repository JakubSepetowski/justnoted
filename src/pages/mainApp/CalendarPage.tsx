import { Container } from '../../components/mainApp/Container';
import { CalendarContent } from '../../components/mainApp/contents/calendar/CalendarContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const CalendarPage = () => {
	useCloseNotePopup()
	return (
		<Container>
			<CalendarContent />
		</Container>
	);
};

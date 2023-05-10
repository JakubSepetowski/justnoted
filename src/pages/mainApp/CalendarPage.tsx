import { motion } from 'framer-motion';
import { PageAnim } from '../../animations/animations';
import { Container } from '../../components/container/Container';
import { CalendarContent } from '../../components/mainApp/contents/calendar/CalendarContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const CalendarPage = () => {
	useCloseNotePopup();
	return (
		<motion.div variants={PageAnim} initial='hidden' animate='visible'>
			<Container>
				<CalendarContent />
			</Container>
		</motion.div>
	);
};

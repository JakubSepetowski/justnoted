import { motion } from 'framer-motion';
import { PageAnim } from '../../animations/animations';
import { Container } from '../../components/mainApp/Container';
import { NotesContent } from '../../components/mainApp/contents/notes/NotesContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const NotesPage = () => {
	useCloseNotePopup();
	return (
		<motion.div variants={PageAnim} initial='hidden' animate='visible'>
			<Container>
				<NotesContent isTrashSite={false} />
			</Container>
		</motion.div>
	);
};

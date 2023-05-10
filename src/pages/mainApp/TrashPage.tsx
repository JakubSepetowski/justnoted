import { motion } from 'framer-motion';
import { PageAnim } from '../../animations/animations';
import { Container } from '../../components/container/Container';
import { NotesContent } from '../../components/mainApp/contents/notes/NotesContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const TrashPage = () => {
	useCloseNotePopup();
	return (
		<motion.div variants={PageAnim} initial='hidden' animate='visible'>
			<Container>
				<NotesContent isTrashSite={true} />
			</Container>
		</motion.div>
	);
};

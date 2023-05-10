import { motion } from 'framer-motion';
import { PageAnim } from '../../animations/animations';
import { Container } from '../../components/container/Container';
import { NewNoteContent } from '../../components/mainApp/contents/newNote/NewNoteContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const NewNotePage = () => {
	useCloseNotePopup();
	return (
		<motion.div variants={PageAnim} initial='hidden' animate='visible'>
			<Container>
				<NewNoteContent />
			</Container>
		</motion.div>
	);
};

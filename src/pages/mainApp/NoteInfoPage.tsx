import { motion } from 'framer-motion';
import { PageAnim } from '../../animations/animations';
import { Container } from '../../components/container/Container';
import { NoteInfoContent } from '../../components/mainApp/contents/noteInfo/NoteInfoContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const NoteInfoPage = () => {
	useCloseNotePopup();
	return (
		<motion.div variants={PageAnim} initial='hidden' animate='visible'>
			<Container>
				<NoteInfoContent />
			</Container>
		</motion.div>
	);
};

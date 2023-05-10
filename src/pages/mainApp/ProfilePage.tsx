import { motion } from 'framer-motion';
import { PageAnim } from '../../animations/animations';
import { Container } from '../../components/container/Container';
import { ProfileContent } from '../../components/mainApp/contents/profile/ProfileContent';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';

export const ProfilePage = () => {
	useCloseNotePopup();
	return (
		<motion.div variants={PageAnim} initial='hidden' animate='visible'>
			<Container>
				<ProfileContent />
			</Container>
		</motion.div>
	);
};

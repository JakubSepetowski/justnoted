import { motion } from 'framer-motion';
import { Container } from '../../components/mainApp/Container';
import { HomeContent } from '../../components/mainApp/contents/home/HomeContent';
import { HomeHeader } from '../../components/mainApp/headers/HomeHeader';
import { useCloseNotePopup } from '../../hooks/useCloseNotePopup';
import { PageAnim} from '../../animations/animations';

export const MainAppPage = () => {
	useCloseNotePopup();
	return (
		<motion.div variants={PageAnim} initial='hidden' animate='visible'>
			<Container>
				<HomeHeader />
				<HomeContent />
			</Container>
		</motion.div>
	);
};

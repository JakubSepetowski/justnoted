import { useSelector } from 'react-redux';
import { PopupInfo } from '../common/PopupInfo';
import { UserInfo } from '../common/UserInfo';
import { Nav } from '../mainApp/nav/Nav';
import { RootState } from '../../store/store';
import { NotePopup } from '../mainApp/contents/calendar/NotePopup';
import { AnimatePresence, motion } from 'framer-motion';
import { opacityContAnim } from '../../animations/animations';

interface Props {
	children: React.ReactNode;
}
export const Container = (props: Props) => {
	const isOpenInfo = useSelector((state: RootState) => state.popup.isOpen);
	const isOpenPopupNote = useSelector((state: RootState) => state.notesPopup.isOpen);

	return (
		<div className='h-screen w-full overflow-hidden'>
			<div className='h-full w-full flex'>
				<Nav />
				<motion.main variants={opacityContAnim} className='h-full w-full relative overflow-hidden '>
					{props.children}
					<UserInfo />
					<AnimatePresence>{isOpenInfo && <PopupInfo />}</AnimatePresence>
					<AnimatePresence>{isOpenPopupNote && <NotePopup />}</AnimatePresence>
				</motion.main>
			</div>
		</div>
	);
};

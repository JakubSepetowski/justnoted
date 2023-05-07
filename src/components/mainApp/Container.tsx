import { useDispatch, useSelector } from 'react-redux';
import { PopupInfo } from './common/PopupInfo';
import { UserInfo } from './common/UserInfo';
import { Nav } from './nav/Nav';
import { RootState } from '../../store/store';
import { NotePopup } from './contents/calendar/NotePopup';

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
				<main className='h-full w-full relative'>
					{props.children}
					<UserInfo />
					{isOpenInfo && <PopupInfo />}
					{isOpenPopupNote && <NotePopup />}
				</main>
			</div>
		</div>
	);
};

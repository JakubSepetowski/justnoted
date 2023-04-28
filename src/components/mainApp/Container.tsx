import { useDispatch, useSelector } from 'react-redux';
import { PopupInfo } from './common/PopupInfo';
import { UserInfo } from './common/UserInfo';
import { Nav } from './nav/Nav';
import { RootState } from '../../store/store';

interface Props {
	children: React.ReactNode;
}
export const Container = (props: Props) => {
	const isOpen = useSelector((state: RootState) => state.popup.isOpen);

	

	
	return (
		<div className='h-screen w-full overflow-hidden'>
			<div className='h-full w-full flex'>
				<Nav />
				<main className='h-full w-full relative'>
					{props.children}
					<UserInfo />
					{isOpen && <PopupInfo />}
				</main>
			</div>
		</div>
	);
};

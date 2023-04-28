import { PopupInfo } from './common/PopupInfo';
import { UserInfo } from './common/UserInfo';
import { Nav } from './nav/Nav';
interface Props {
	children: React.ReactNode;
}
export const Container = (props: Props) => {
	return (
		<div className='h-screen w-full overflow-hidden'>
			<div className='h-full w-full flex'>
				<Nav />
				<main className='h-full w-full relative'>
					{props.children}
					<UserInfo />
					<PopupInfo/>
				</main>
			</div>
		</div>
	);
};

import { UserInfo } from './common/UserInfo';
import { Nav } from './nav/Nav';
interface Props {
	children: React.ReactNode;
}
export const Container = (props: Props) => {
	return (
		<main className='h-screen w-full overflow-hidden'>
			<div className='h-full w-full flex'>
				<Nav />
				<main className='h-full w-full'>
					{props.children}
					<UserInfo />
				</main>
			</div>
		</main>
	);
};

import { Nav } from './nav/Nav';
interface Props {
	children: React.ReactNode;
}
export const Container = (props: Props) => {
	return (
		<main className='h-screen w-full'>
			<div className='h-full w-full flex mx-auto max-w-[1800px]'>
				<Nav />
				<main className='h-full w-full'>{props.children}</main>
			</div>
		</main>
	);
};

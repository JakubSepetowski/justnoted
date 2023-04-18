import { Nav } from './Nav';

export const Container = () => {
	return (
		<main className='h-screen w-full'>
			<div className='h-full w-full flex mx-auto max-w-[1800px]'>
				<Nav />
				<div className='h-full w-full bg-red-400 '>
					test test test
				</div>
			</div>
		</main>
	);
};

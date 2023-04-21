import { ContentWrapper } from './ContentWrapper';

export const HomeContent = () => {
	return (
		<ContentWrapper>
			<div className=' h-full flex flex-col justify-center md:gap-10 lg:gap-0  lg:justify-between'>
				<div className='hidden w-full md:flex  lg:mt-[-60px] z-30 h-52 gap-10'>
					<div className='bg-white flex-grow rounded-md shadow-md'>1</div>
					<div className='bg-white w-1/3 rounded-md shadow-md'>2</div>
				</div>
				<div className='w-full h-full md:h-auto'>
					<div className='md:bg-white bg-red-400 h-full flex-grow md:rounded-md md:shadow-md md:h-96'>3</div>
				</div>
			</div>
		</ContentWrapper>
	);
};

import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ContentWrapper } from '../../common/ContentWrapper';
import { Clock } from './Clock';
import { Important } from './Important';
import { QucikNote } from './QucikNote';
import { Habbits } from './Habbits';

export const HomeContent = () => {
	const isFetched = useSelector((state: RootState) => state.notes.isFetched);
	return (
		<ContentWrapper hasHeader={true}>
			<div className=' h-full w-full flex flex-col md:justify-center overflow-y-auto noscroll gap-5 '>
				<div className='w-full flex flex-col md:flex-row gap-5 h-full md:h-[42%]'>
					<Clock />
					<Important />
				</div>
				<div className='w-full flex flex-col md:flex-row gap-5 h-full md:h-[42%] items-end'>
					<QucikNote />
					<Habbits />
				</div>
			</div>
		</ContentWrapper>
	);
};

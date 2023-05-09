import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ContentWrapper } from '../../../common/ContentWrapper';
import { Card } from './Card';
import important from '../../../../assets/svg/important.svg';
import pinned from '../../../../assets/svg/pinned.svg';
import { HomeNotesNames } from '../../../../types/types';
import { motion } from 'framer-motion';
import { Quote } from './Quote';
import { Clock } from './Clock';
import { fromBottomAnim} from '../../../../animations/animations';

export const HomeContent = () => {
	const imortantNoteDesc = useSelector((state: RootState) => state.homeNotes.importantNoteDesc);
	const quickNoteDesc = useSelector((state: RootState) => state.homeNotes.quickNoteDesc);

	return (
		<ContentWrapper hasHeader={true}>
			<div className='h-full w-full flex flex-col md:justify-center overflow-y-auto noscroll gap-5 '>
				<motion.div variants={fromBottomAnim} className='w-full flex flex-col md:flex-row gap-5 h-full md:h-[42%]'>
					<Quote />
					<Card
						name={HomeNotesNames.importantNote}
						desc={imortantNoteDesc}
						title='Keep this in mind'
						info='Add here important things'
						img={important}
					/>
				</motion.div>
				<motion.div variants={fromBottomAnim}  className='w-full flex flex-col md:flex-row gap-5 h-full md:h-[42%] items-end'>
					<Card
						name={HomeNotesNames.quickNote}
						desc={quickNoteDesc}
						title='Quick note'
						info='Add before you forget'
						img={pinned}
					/>
					<Clock />
				</motion.div>
			</div>
		</ContentWrapper>
	);
};

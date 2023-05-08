import { useState } from 'react';
import { CardHeader } from './CardHeader';
import { Edit } from './Edit';
import add from '../../../../assets/lotties/add.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { Spinner } from '../../../common/Spinner';
import { motion } from 'framer-motion';
import { opacityAnim } from '../../../../animations/animations';
interface Props {
	title: string;
	info: string;
	img: string;
	desc: string;
	name: string;
}

export const Card = ({ title, info, img, desc, name }: Props) => {
	const [isEditing, setIsEditing] = useState(false);
	const isFetched = useSelector((state: RootState) => state.homeNotes.isFetched);

	const editCardHandler = () => {
		setIsEditing((prev) => !prev);
	};
	const closeEditModeHanlder = () => {
		setIsEditing(false);
	};

	return (
		<div className='bg-white rounded-md h-full overflow-y-auto p-4 border flex flex-col  w-full text-sm md:text-base relative noscroll'>
			<CardHeader title={title} info={info} titleImg={img} onClick={editCardHandler} />
			<div
				className={`h-full pt-4 pb-4 flex  items-center relative ${
					isFetched ? 'justify-start' : 'justify-center'
				}`}>
				{isFetched && isEditing && <Edit name={name} desc={desc} onClose={closeEditModeHanlder} />}

				{isFetched && !isEditing && desc && (
					<motion.p variants={opacityAnim} className='text-sm md:text-base'>
						{desc}
					</motion.p>
				)}
				{isFetched && !isEditing && !desc && (
					<motion.div
						variants={opacityAnim}
						onClick={() => setIsEditing(true)}
						className='w-20 md:w-28 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] cursor-pointer '>
						<Player src={add} className='w-full' loop autoplay />
					</motion.div>
				)}
				{!isFetched && <Spinner isAbsolute={false} />}
			</div>
		</div>
	);
};

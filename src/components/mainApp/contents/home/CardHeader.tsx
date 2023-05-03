import edit from '../../../../assets/svg/edit.svg';

interface Props {
	title: string;
	titleImg: string;
	onClick: () => void;
}

export const CardHeader = ({ title, titleImg, onClick }: Props) => {
	return (
		<div className='flex w-full justify-between items-center'>
			<div className='flex justify-start items-center w-auto border-b pb-2 '>
				<h3 className=' text-sm md:text-lg lg:text-xl'>{title}</h3>
				<img className='ml-2 w-4 h-4 md:w-6 md:h-6' src={titleImg} alt='important icon' />
			</div>
			<button onClick={onClick}>
				<img className='w-4 h-4 md:w-6 md:h-6 ' src={edit} alt='edit button icon' />
			</button>
		</div>
	);
};

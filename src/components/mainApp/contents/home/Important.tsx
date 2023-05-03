import important from '../../../../assets/svg/important.svg';
import { CardHeader } from './CardHeader';

export const Important = () => {
	const editCardHandler = () => {
		console.log('ok');
	};
	return (
		<div className='bg-white rounded-md h-56  md:h-full overflow-y-auto p-4 border flex flex-col  w-full text-sm md:text-base relative'>
			<CardHeader title='Keep this in mind' info='Add here importants thigns' titleImg={important} onClick={editCardHandler} />
			<div className='h-full pt-4 pb-4 flex justify-center items-center'>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi accusamus itaque dicta
				est perferendis harum cupiditate adipisci aut. Soluta dolore exercitationem asperiores fuga
				veritatis! Architecto illo adipisci ut neque expedita, ullam asperiores autem eos velit
				molestias perferendis, vel tempore cum?
			</div>
		</div>
	);
};

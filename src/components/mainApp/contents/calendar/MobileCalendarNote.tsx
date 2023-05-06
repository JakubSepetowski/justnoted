import { Link } from 'react-router-dom';
import heart from '../../../../assets/svg/fav-blue.svg';
interface Props {
	title: string;
	id: string;
	fav: boolean;
}

export const MobileCalendarNote = ({ title,fav, id }: Props) => {
	return (
		<div className='border rounded-md  shadow-sm text-black p-2 flex justify-between'>
			<div className='flex items-center'>
                {fav&& <img className='w-4 mr-2' src={heart} alt='heart icon' ></img>}
				<h3 className='font-semibold'>{title}</h3>
			</div>
			<Link
				to={`/app/notes/note/${id}`}
				className='text-blue-700 font-semibold hover:text-blue-600 duration-200 transition-colors'>
				more
			</Link>
		</div>
	);
};

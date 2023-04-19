import { Link } from 'react-router-dom';

interface Props {
	title: string;
	desc: string;
}

export const RegisterHeaderContent = ({ title, desc }: Props) => {
	return (
		<div className='w-full flex flex-col justify-center md:items-center lg:w-1/3 bg-blue-700 lg:h-full lg:rounded-xl p-4 md:p-8 text-white h-1/3 relative '>
			<Link className='absolute top-0 left-0 p-4 md:p-8' to='/'>
				JustNoted
			</Link>
			<h1 className='text-2xl  md:text-5xl mt-10 md:mt-0'>{title}</h1>
			<p className='text-neutral-400 mt-1 lg:mt-6 md:text-xl mb-10 md:mb-0'>{desc}</p>
		</div>
	);
};

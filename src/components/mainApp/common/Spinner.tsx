import spinner from '../../../assets/svg/spinner.svg';

interface Props {
	isAbsolute: boolean;
}

export const Spinner = ({ isAbsolute }: Props) => {
	return (
		<img
			className={`animate-spin  w-10 h-10 ${isAbsolute ? 'absolute' : ''}`}
			src={spinner}
			alt='laoding icon'
		/>
	);
};

import checkMark from '../../assets/svg/checkMark.svg';

interface Props {
	color: string;
	currColor: string;
	onChange: (col: string) => void;
}

export const ColorsBtns = ({ color, currColor, onChange }: Props) => {
	const onChangeHandler = () => {
		onChange(color);
	};
	return (
		<button
			onClick={onChangeHandler}
			type='button'
			className={`${color} ${color}-hover transition-colors duration-200  w-5 h-5 rounded-full flex justify-center items-center`}>
			{currColor === color && (
				<img className='w-2/3' src={checkMark} alt='currently selected color'></img>
			)}
		</button>
	);
};

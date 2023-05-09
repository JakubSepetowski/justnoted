interface Props {
	name: string;
	oldValue: string;
	newValue: string;
	color:string
}

export const HistoryItem = ({ name, newValue, oldValue,color }: Props) => {
	return (
		<p className='mt-2'>
			<span className='font-semibold'>{name}</span> was changed from:{' '}
			<span className='font-semibold'>{oldValue}</span> to{' '}
			<span className={`font-semibold ${color}-text `}>{newValue}</span>
		</p>
	);
};

interface Props {
	name: string;
	oldValue: string;
	newValue: string;
}

export const HistoryItem = ({ name, newValue, oldValue }: Props) => {
	return (
		<p className='mt-2'>
			<span className='font-semibold'>{name}</span> was changed from:{' '}
			<span className='font-semibold text-red-500'>{oldValue}</span> to{' '}
			<span className='font-semibold text-blue-700'>{newValue}</span>
		</p>
	);
};

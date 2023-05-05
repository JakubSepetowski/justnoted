interface Props {
	spanText: string;
	desc: string;
	addMarign: boolean;
}

export const InfoItem = ({ spanText, desc, addMarign }: Props) => {
	return (
		<p className={`${addMarign ? 'mt-1' : ''}`}>
			<span className='font-semibold'>{spanText}: </span>
			{desc}
		</p>
	);
};

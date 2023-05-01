interface Props {
	title: string;
}

export const H2 = ({ title }: Props) => {
	return <h2 className='font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl '>{title}</h2>;
};

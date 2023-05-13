interface Props {
	children: React.ReactNode;
}

export const HeaderWrapper = ({ children }: Props) => {
	return (
		<header className='w-full h-1/4 headerBgc flex justify-start items-center p-4 md:p-8 shadow-md overflow-hidden'>
			{children}
		</header>
	);
};

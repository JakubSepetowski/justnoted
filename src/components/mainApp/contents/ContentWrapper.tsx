interface Props {
	children: React.ReactNode;
}

export const ContentWrapper = ({ children }: Props) => {
	return <main className='p-4 md:p-8 h-3/4'>{children}</main>;
};

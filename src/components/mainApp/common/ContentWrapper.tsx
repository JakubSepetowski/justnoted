interface Props {
	children: React.ReactNode;
	hasHeader: boolean;
}

export const ContentWrapper = ({ children, hasHeader }: Props) => {
	return <main className={`p-4 md:p-8 ${hasHeader ? 'h-3/4' : 'h-full'}`}>{children}</main>;
};

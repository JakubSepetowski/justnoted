interface Props {
	children: React.ReactNode;
	hasHeader: boolean;
}

export const ContentWrapper = ({ children, hasHeader }: Props) => {
	return (
		<div className={`p-4 md:p-8 overflow-y-auto noscroll ${hasHeader ? 'h-3/4' : 'h-full'}`}>
			{children}
		</div>
	);
};

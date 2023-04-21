interface Props {
	children: React.ReactNode;
}

export const HeaderWrapper = ({ children }: Props) => {
	const user = JSON.parse(localStorage.getItem('user')!);
	return (
		<header className='w-full h-36 md:h-1/4 headerBgc flex justify-start items-center relative p-4 md:p-8 shadow-md'>
			{children}
			<div className='absolute top-5 right-5 bg-zinc-900 sm:p-1 text-white rounded-3xl sm:min-w-0  shadow-md flex items-center'>
				<img
					className='w-6 h-6 md:w-8 md:h-8 xl:w-10 xl:h-10 rounded-full'
					src='https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-18-27-49.png'
					alt=''
				/>
				<p className='hidden sm:inline-block sm:pr-2 md:pr-4 ml-2 xl:text-lg xl:ml-3'>
					{user.displayName}
				</p>
			</div>
		</header>
	);
};

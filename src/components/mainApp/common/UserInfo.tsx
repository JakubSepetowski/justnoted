export const UserInfo = () => {
    const user = JSON.parse(localStorage.getItem('user')!);
	return (
		<div className='absolute top-5 right-5 bg-zinc-900 sm:p-1 text-white rounded-3xl sm:min-w-0  shadow-md flex items-center cursor-pointer'>
			<img
				className='w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8 rounded-full'
				src={user.photoURL}
				alt=''
			/>
			<p className='hidden sm:inline-block sm:pr-2 md:pr-4 ml-2  xl:ml-3'>{user.displayName}</p>
		</div>
	);
};

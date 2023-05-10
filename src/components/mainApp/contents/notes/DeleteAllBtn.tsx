
interface Props {
	length: number;
	onPopupOpen: () => void;
}

export const DeleteAllBtn = ({ length, onPopupOpen }: Props) => {
	return (
		<button
			disabled={length === 0}
			onClick={onPopupOpen}
			className='p-1 rounded-md  md:w-auto lg:w-32 w-full mt-2 md:mt-0 md:mr-2 bg-blue-700 text-white  md:rounded-md flex  justify-center items-center duration-200 transition-colors hover:bg-blue-600'>
			Delete All
		</button>
	);
};

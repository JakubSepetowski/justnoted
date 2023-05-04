import { useState, useEffect } from 'react';

export const Clock = () => {
	let time = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	});
	const [currTime, setCurrTime] = useState(time);

	const updateTime = () => {
		time = new Date().toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		});
		setCurrTime(time);
	};

	useEffect(() => {
		const interval = setInterval(updateTime, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className='bg-white rounded-md h-64  md:h-full overflow-y-auto p-4 border flex flex-col justify-center items-center w-full md:w-3/5'>
			<p className='text-blue-700 text-2xl md:text-4xl lg:text-5xl mb-4'>{currTime}</p>
		</div>
	);
};

import { Fragment, useEffect, useState } from 'react';
import { getMonth } from '../../../../../utils/utils';
import { BigCalendarHeader } from './BigCalendarHeader';
import { Day } from './Day';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';


export const BigCalendar = () => {
	const [currMonth, setCurrMonth] = useState(getMonth());
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const notes = useSelector((state: RootState) => state.notes.notes);

	useEffect(() => {
		setCurrMonth(getMonth(monthIndex));
	}, [monthIndex]);

	const nextOrPrevMonthHandler = (change: string) => {
		if (change === 'next') setMonthIndex((prev) => prev + 1);
		else setMonthIndex((prev) => prev - 1);
	};
	const resetMonthHandler = () => {
		if (monthIndex === dayjs().month()) return;
		setMonthIndex(dayjs().month());
	};
	return (
		<div className='flex flex-col h-full w-full bg-white rounded-md shadow-md overflow-hidden'>
			<BigCalendarHeader
				monthIndex={monthIndex}
				onNextOrPrevMonthHandler={nextOrPrevMonthHandler}
				onResetMonth={resetMonthHandler}
			/>
			<div className='h-full w-full grid grid-cols-7 grid-rows-5'>
				{currMonth.map((row, i) => (
					<Fragment key={i}>
						{row.map((day, idx) => (
							<Day key={idx} day={day} rowIdx={i}  />
						))}
					</Fragment>
				))}
			</div>
		</div>
	);
};

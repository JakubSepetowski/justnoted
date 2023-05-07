import { ContentWrapper } from '../../common/ContentWrapper';
import { MobileCalendar } from './mobile/MobileCalendar';
import { BigCalendar } from './big/BigCalendar';

export const CalendarContent = () => {
	return (
		<ContentWrapper hasHeader={false}>
			<MobileCalendar />
			<BigCalendar />
		</ContentWrapper>
	);
};

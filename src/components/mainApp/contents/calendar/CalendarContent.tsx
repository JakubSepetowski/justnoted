import { Link } from 'react-router-dom';
import { ContentWrapper } from '../../common/ContentWrapper';
import { H2 } from '../../common/H2';
import { MobileCalendar } from './MobileCalendar';

export const CalendarContent = () => {
	return (
		<ContentWrapper hasHeader={false}>
			<MobileCalendar />
		</ContentWrapper>
	);
};

import { ContentWrapper } from '../../../common/ContentWrapper';
import { MobileCalendar } from './mobile/MobileCalendar';
import { BigCalendar } from './big/BigCalendar';
import { useMediaQuery } from '@react-hook/media-query';

export const CalendarContent = () => {
	const isSmallScreen = useMediaQuery('(max-width: 768px)');
	return (
		<ContentWrapper hasHeader={false}>
			{isSmallScreen && <MobileCalendar />}
			{!isSmallScreen && <BigCalendar />}
		</ContentWrapper>
	);
};

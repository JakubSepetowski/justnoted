import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { ContentWrapper } from '../../common/ContentWrapper';

export const HomeContent = () => {
	const isFetched = useSelector((state: RootState) => state.notes.isFetched);
	return (
		<ContentWrapper hasHeader={true}>
			<div className=' h-full w-full'>{!isFetched && <p>Loading plase wait...</p>}</div>
		</ContentWrapper>
	);
};

import { ContentWrapper } from '../../../ui/ContentWrapper';
import { DeleteAccount } from './DeleteAccount ';
import { Security } from './Security';
import { MyProfile } from './MyProfile';

export const ProfileContent = () => {
	return (
		<ContentWrapper hasHeader={false}>
			<div className='w-full h-full overflow-y-auto noscroll'>
				<MyProfile />
				<Security />
				<DeleteAccount />
			</div>
		</ContentWrapper>
	);
};

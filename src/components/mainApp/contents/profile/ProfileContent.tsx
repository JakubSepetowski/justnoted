import { ContentWrapper } from '../../common/ContentWrapper';
import { AccountManagment } from './AccountManagment';
import { Security } from './Security';
import { Theme } from './Theme';
import { MyProfile } from './MyProfile';

export const ProfileContent = () => {
	return (
		<ContentWrapper hasHeader={false}>
			<div className='w-full h-full overflow-y-auto'>
				<MyProfile />
				<Theme />
				<Security />
				<AccountManagment />
			</div>
		</ContentWrapper>
	);
};

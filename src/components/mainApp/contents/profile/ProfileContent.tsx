import { ContentWrapper } from '../../common/ContentWrapper';
import { DeleteAccount  } from './DeleteAccount ';
import { Security } from './Security';
import { Theme } from './Theme';
import { MyProfile } from './MyProfile';

export const ProfileContent = () => {
	return (
		<ContentWrapper hasHeader={false}>
			<div className='w-full h-full overflow-y-auto noscroll'>
				<MyProfile />
				<Theme />
				<Security />
				<DeleteAccount  />
			</div>
		</ContentWrapper>
	);
};

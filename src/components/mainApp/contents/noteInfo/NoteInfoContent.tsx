import { useParams } from 'react-router-dom';
import { ContentWrapper } from '../../common/ContentWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';


export const NoteInfoContent = () => {
	const params = useParams();
	const notes = useSelector((state: RootState) => state.notes.notes);
	const noteId = params.noteId;
	const noteInfo = notes.filter((note) => noteId === note.id).at(0)!;
	console.log(noteInfo);

	return (
		<ContentWrapper hasHeader={false}>
			<div className='w-full h-full bg-red-500'></div>
		</ContentWrapper>
	);
};

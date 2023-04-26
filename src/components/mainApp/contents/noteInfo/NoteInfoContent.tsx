import { useParams } from 'react-router-dom';
import { ContentWrapper } from '../../common/ContentWrapper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

export const NoteInfoContent = () => {
	const params = useParams();
	const notes = useSelector((state: RootState) => state.notes.notes);
	const noteId = params.noteId;
	const notesInfo = notes.filter((note) => noteId === note.id).at(0);
	console.log(notesInfo);

	return (
		<ContentWrapper hasHeader={false}>
			<div>to jest info o notatce</div>
		</ContentWrapper>
	);
};

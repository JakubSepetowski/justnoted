import { Container } from '../../components/mainApp/Container';
import { NewNoteContent } from '../../components/mainApp/contents/newNote/NewNoteContent';

export const NewNotePage = () => {
	// const isAuth = useSelector((state: RootState) => state.authentication.isAuth);
	// const [notes, setNotes] = useState([{}]);

	// useEffect(() => {
	// 	if (!auth.currentUser?.uid) return;
	// 	const notesCollection = collection(dataBase, `users/${auth.currentUser.uid}/notes`);
	// 	const unsubscribe = onSnapshot(notesCollection, (querySnapshot) => {
	// 		const fetchedNotes = querySnapshot.docs.map((doc) => ({
	// 			id: doc.id,
	// 			...doc.data(),
	// 		}));
	// 		setNotes(fetchedNotes);
	// 	});
	// 	return () => {
	// 		unsubscribe();
	// 	};
	// }, [isAuth]);

	// console.log(notes);
	//wysatrczy ze przy dodawniu notakti do bazy danych beda ja dodawac do reduxa w tym samyn czasie
	//a potem zczytwtywac wszytsko z reduxa

	return (
		<Container>
			<NewNoteContent />
		</Container>
	);
};

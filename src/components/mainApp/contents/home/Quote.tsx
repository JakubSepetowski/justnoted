import { useEffect } from 'react';
import { Quote as QuoteType } from '../../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { quoteSlice } from '../../../../store/quoteSlice';
import { Spinner } from '../../common/Spinner';
let initial = true;

export const Quote = () => {
	const dispatch = useDispatch();
	const quoteText = useSelector((state: RootState) => state.quote.quote);
	const quoteAuthor = useSelector((state: RootState) => state.quote.author);
	useEffect(() => {
		const getQuote = async () => {
			const apiKey = import.meta.env.VITE_API_QUOTES;
			const url = `https://api.api-ninjas.com/v1/quotes`;
			try {
				const response = await fetch(url, {
					headers: { 'X-Api-Key': apiKey },
				});
				const data = (await response.json()) as QuoteType[];
				dispatch(quoteSlice.actions.setQuote({ quote: data[0].quote, author: data[0].author }));
			} catch (err) {
				dispatch(
					quoteSlice.actions.setQuote({
						quote: 'The way to get started is to quit talking and begin doing.',
						author: 'Walt Disney',
					})
				);
			}
			initial = false;
		};
		if (initial) getQuote();

		return () => {
			initial = false;
		};
	}, []);

	return (
		<>
			{quoteAuthor && quoteText && (
				<div className='text-center text-xs md:text-sm '>
					<p className='italic'>"{quoteText}"</p>
					<p className='font-semibold mt-2'>by {quoteAuthor}</p>
				</div>
			)}
			{!quoteAuthor && !quoteText && <Spinner isAbsolute={false}/>}
		</>
	);
};

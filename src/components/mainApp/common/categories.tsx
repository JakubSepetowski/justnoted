export const categories = ['shopping', 'home'];
export const categoryOptions = categories.map((product, key) => (
	<option value={product} key={key}>
		{product}
	</option>
));

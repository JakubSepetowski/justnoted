export const categories = ['Shopping', 'Home',"Work","Study","Hobby","Finance","Health"];

export const categoryOptions = categories.map((product, key) => (
	<option value={product} key={key}>
		{product}
	</option>
));

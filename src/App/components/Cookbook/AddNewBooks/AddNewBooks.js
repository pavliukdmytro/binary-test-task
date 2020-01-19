import React, {createRef} from 'react';
import Button from '../../general/Button/Button';

function AddNewBooks(props) {
	const form = createRef()

	function sendRecipe(e) {
		e.preventDefault();
		const data = new FormData(form.current);
		props.createRecipe(data);
	}

	return (
		<form onSubmit={sendRecipe} ref={form}>
			<textarea type="text" name="recipe"/>
			<Button type="submit">add</Button>
		</form>
	)
}

export default AddNewBooks;
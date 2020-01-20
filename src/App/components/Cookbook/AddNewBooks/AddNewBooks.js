import React, {createRef, useState} from 'react';
import Button from '../../general/Button/Button';

function AddNewBooks(props) {
	const form = createRef();
	const [warning, setWarning] = useState(false)

	function sendRecipe(e) {
		e.preventDefault();
		const data = new FormData(form.current);
		props.createRecipe(data);
	}

	return (
		<form onSubmit={sendRecipe} ref={form} className="add-new-books">
			<textarea type="text" name="recipe" />
			<div className={}>input should don't be empty</div>
			<Button type="submit">add</Button>
		</form>
	)
}

export default AddNewBooks;

import React, {createRef, useState} from 'react';
import Button from '../../general/Button/Button';
import './addNewBooks.scss';

function AddNewBooks(props) {
	const form = createRef();
	const [warning, setWarning] = useState(false);

	function sendRecipe(e) {
		e.preventDefault();
		const data = new FormData(form.current);
		if(form.current.querySelector('textarea').value.trim() === '') {
			setWarning(true);
			return;
		}
		setWarning(false);
		props.createRecipe(data);
		form.current.querySelector('textarea').value = '';
	}

	return (
		<form onSubmit={sendRecipe} ref={form} className="add-new-books">
			<textarea type="text" name="recipe" />
			{warning ? <div className="add-new-books-warning">input should don't be empty</div> : ''}
			<Button type="submit">Add</Button>
		</form>
	)
}

export default AddNewBooks;

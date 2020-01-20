import React, {useState, useEffect} from 'react';
//components
import AddNewBooks from './AddNewBooks/AddNewBooks';
import Books from './Books/Books';

function Cookbook() {
	const [books, setBooks] = useState([]);
	const headers = {
		'Content-Type' : 'application/json'
	}

	async function createRecipe(data) {
		const send = await fetch('/addRecipe', {
			method: 'POST',
			body: data
		});
		const response = await send.json();
		console.log(response.book);
		setBooks([
			...books,
			response.book
		]);
		console.log(books);
	};
	async function deleteRecipe(id) {
		const deleteFetch = await fetch('/deleteRecipe', {
			method: "DELETE",
			headers,
			body: JSON.stringify({
				_id: id
			})
		});
		const response = await deleteFetch.json();
		setBooks(books.filter((el) => el._id !== response._id));
	};
	function allowEditing(id, recipe) {
		setBooks( books.map((el) => {
				if(el._id === id) {
					el.modify = true
				}
				return el;
			})
		);
		setTimeout( () => recipe.focus(), 0);
	}
	async function changeBook(id, recipe) {
		// console.log(id, text);
		const changeBook = await fetch('/putRecipe', {
			method: 'PUT',
			headers,
			body: JSON.stringify({id,recipe})
		});
		const response = await changeBook.json();
		setBooks(books.map(el => {
			if(el._id === response._id) {
				el.recipe = response.recipe,
				el.modify = false
			}
			return el;
		}));
	}
	useEffect(() => {
		async function getBooks() {
			const getFetch = await fetch('/getRecipe');
			const response = await getFetch.json();
			//console.log('I want a book!', response);
			setBooks(response);
		}
		getBooks();
	}, []);
	return (
		<>
			<h1>Recipes</h1>
			<AddNewBooks createRecipe={createRecipe} />
			<Books	books={books}
					deleteRecipe={deleteRecipe}
					allowEditing={allowEditing}
					changeBook = {changeBook}
			/>
		</>
	)
}

export default Cookbook;

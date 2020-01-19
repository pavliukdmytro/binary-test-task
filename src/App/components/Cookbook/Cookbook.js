import React, {useState, useEffect} from 'react';
//components
import AddNewBooks from './AddNewBooks/AddNewBooks';
import Books from './Books/Books';
function Cookbook() {
	const [books, setBooks] = useState([]);
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


	useEffect(() => {
		async function getBooks() {
			const getFetch = await fetch('/getRecipe')
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
			<Books books={books}/>
		</>
	)
}

export default Cookbook;
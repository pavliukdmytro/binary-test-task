import React, {useState, useEffect} from 'react';
import './Cookbook.scss';
//components
import AddNewBooks from './AddNewBooks/AddNewBooks';
import Books from './Books/Books';

function Cookbook() {
	const [books, setBooks] = useState([]);
	const [load, setLoad] = useState(false);
	const headers = {
		'Content-Type' : 'application/json'
	}

	async function createRecipe(data) {
		const send = await fetch('/addRecipe', {
			method: 'POST',
			body: data
		})
			.catch((err) => console.error(err));
		try {
			const response = await send.json();
			setBooks([
				response.book,
				...books,
			]);
		} catch (e) {
			console.log(e);
		}
	};
	async function deleteRecipe(id) {
		const deleteFetch = await fetch('/deleteRecipe', {
			method: "DELETE",
			headers,
			body: JSON.stringify({
				_id: id
			})
		})
			.catch((err) => console.error(err));
		try {
			const response = await deleteFetch.json();
			setBooks(books.filter((el) => el._id !== response._id));
		} catch (e) {
			console.error('json error');
		}

	};
	function allowEditing(id, recipe, book) {
		setBooks( books.map((el) => {
				if(el._id === id) {
					el.modify = true
				}
				return el;
			}));
		setTimeout( () => recipe.focus(), 0);

		const endEdit = async () => {
			let oldRecipe = '';
			setBooks( books.map((el) => {
					if(el._id === id) {
						oldRecipe = el.recipe;
						el.recipe = recipe.textContent;
					}
					return el;
				})
			);

			const changeBook = await fetch('/putRecipe', {
				method: 'PUT',
				headers,
				body: JSON.stringify({
					...book,
					oldRecipe
				})
			})
			.catch((err) => console.log(err));
			try {
				const response = await changeBook.json();
				setBooks(books.map(el => {
					if(el._id === response._id) {
						el.recipe = response.recipe,
							el.modify = false,
							el.oldRecipe = response.oldRecipe
					}
					return el;
				}));
			} catch (e) {
				console.log('err parse json', e);
			}
			recipe.removeEventListener('focusout', endEdit);
		};
		if(recipe !== null) {
			recipe.addEventListener('focusout', endEdit);
		}
	}
	useEffect(() => {
		setLoad(true);
		async function getBooks() {
			const getFetch = await fetch('/getRecipe')
				.catch((err) => console.error(err));
			try {
				const response = await getFetch.json();
				setBooks(response);
				setLoad(false);
			} catch (err) {
				console.error(err)
			}
		}
		getBooks();
	}, []);
	return (
		<div className="row cook-book">
			<div className="cols l_12 l_offset_6">
				<h1>Recipes</h1>
				<AddNewBooks createRecipe={createRecipe} />
				{
					books.length === 0 && !load?	<div className="cook-book">no recipe</div> :
						!load ? <Books	books={books}
										deleteRecipe={deleteRecipe}
										allowEditing={allowEditing} /> :
							<div className="lds-dual-ring"></div>
				}
			</div>
		</div>
	)
}

export default Cookbook;

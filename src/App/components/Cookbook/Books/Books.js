import React from 'react';
import './books.scss';
function Books(props) {
	return (
		<div className="books-list">
			{
				props.books.map((book) => {
					return (
						<div key={book._id} className="books-list-row">
							<div className="books-list-date">{book.dateCreate}</div>
							{/*{*/}
							{/*	book.modify ?	<textarea  defaultValue={book.recipe}></textarea> :*/}
							{/*		<div contentEditable="true">{book.recipe}</div>*/}
							{/*}*/}
							<div contentEditable={book.modify} className="recipe" suppressContentEditableWarning={book.modify}>{book.recipe}</div>
							<div onClick={ () => props.deleteRecipe(book._id)}>close</div>
							{
								book.modify ? <div onClick={(e) => props.changeBook(book._id, e.target.parentNode.querySelector('.recipe').textContent)} >done</div> :
									<div onClick={(e) => props.allowEditing(book._id, e.target.parentNode.querySelector('.recipe'))} >modify</div>
							}
						</div>
					)
				})
			}
		</div>
	)
}

export default Books;

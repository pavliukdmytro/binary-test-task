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
							<div>{book.recipe}</div>
							<div>close</div>
							<div>modify</div>
						</div>
					)
				})
			}
		</div>
	)
}

export default Books;
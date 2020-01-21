import React from 'react';
import './books.scss';
import Close from '../../../../images/close.svg';
import Pen from '../../../../images/pen.svg';
import Clock from '../../../../images/clock.svg';
function Books(props) {
	function changeBook(e, book) {
		props.allowEditing(book._id, e.currentTarget.parentNode.parentNode.querySelector('.books-list-recipe'), book);
	};
	const dateFormat = (date) => {
		const options = {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: false
		};
		let dateNow = new Date(date)
		return dateNow.toLocaleString('ua', options)
		.replace(/\//g, '.')
		.replace(/,/, '')
	};
	const historyRecipe = (arr) => {
		return (
			<div className="books-list-old">
				<Close onClick={(e) => e.currentTarget.parentNode.classList.remove('open')} />
				{arr.map((el, i) => {
					return (
						<div className="books-list-old-row" key={i}>
							<div className="old-date">{dateFormat(el.dateCreate)}</div>
							<div className="old-recipe">{el.recipe}</div>
						</div>
					)
				})}
			</div>
		)
	};
	const openOldRecipe = (e) => {
		const oldBlock = e.currentTarget.closest('.books-list-row').querySelector('.books-list-old');
		oldBlock.classList.toggle('open');
	}
	return (
		<div className="books-list">
			{
				props.books.map((book, i) => {
					return (
						<div key={book._id} className="books-list-row">
							<div>
								<div className="books-list-date">{dateFormat(book.dateCreate)}</div>
								<div contentEditable={book.modify}
									 className="books-list-recipe"
									 suppressContentEditableWarning={book.modify}>
									{book.recipe}
								</div>
								<span className ="books-list-close">
									<Close onClick={ () => props.deleteRecipe(book._id)} />
								</span>
								<span className ="books-list-pen">
									<Pen onClick={(e) => changeBook(e, book)}/>
								</span>
								{
									book.oldRecipe ?<span className ="books-list-clock">
														<Clock onClick={(e) => openOldRecipe(e)}/>
													</span> : ''
								}
							</div>
							{
								book.oldRecipe ? historyRecipe(book.oldRecipe) :''
							}
						</div>
					)
				})
			}
		</div>
	)
}

export default Books;

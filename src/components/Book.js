import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "./Select";

class Book extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		onUpdateBook: PropTypes.func.isRequired
	};

	render() {
		let book = this.props.book;
		let updateBook = this.props.onUpdateBook;
		let defaultShelf = this.props.defaultShelf;

		let libro = "https://i.imgur.com/kZMKtGu.png";
		if (book.imageLinks) {
			libro = book.imageLinks.thumbnail;
		}

		if (defaultShelf === "none" && book.shelf) {
			defaultShelf = book.shelf;
		}

		if (book) {
			return (
				<div className="book">
					<div className="book-top">
						<div
							className={defaultShelf + " book-cover"}
							style={{
								width: 128,
								height: 193,
								backgroundImage: `url(${libro})`
							}}
						/>
						<div className="book-shelf-changer ">
							<Select
								book={book}
								onUpdateBook={updateBook}
								default={defaultShelf}
							/>
						</div>
					</div>
					<div className="book-title">
						{book.title} <br />[ {book.averageRating || 0} Stars,{" "}
						{book.pageCount} pages ]
						<a target="_blank" href={book.infoLink}>
							link
						</a>
					</div>
					<div className="book-authors" />
				</div>
			);
		}
	}
}

export default Book;

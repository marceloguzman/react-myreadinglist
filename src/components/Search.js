import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";

class Search extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  updateBook = book => {
    this.props.onUpdateBook(book);
  };

  findShelf = mybook => {
    const book2find = this.state.booksOnShelf.find(b => b.id === mybook.id);

    if (book2find) {
      return mybook.shelf || book2find.shelf;
    } else {
      return "none";
    }
  };

  state = {
    query: "",
    books: [],
    booksOnShelf: this.props.booksOnShelf
  };

  // when the component is ready ......
  componentDidMount() {
    //console.log (this.state.booksOnShelf);

    //if the search page is called before the main page, the following code retrieves the books from the API
    if (this.props.booksOnShelf.length === 0) {
      BooksAPI.getAll().then(books => {
        this.setState({ booksOnShelf: books });
        // console.log (" ************ All books retrieved...");
        // console.log (this.state.booksOnShelf);
      });
    }
  }

  // when the users press a key the query string is updated
  _handleKeyPress = e => {
    const querytext = e.target.value;

    //   if(e.keyCode === 13){

    this.setState({
      query: e.target.value
    });

    // if the search term is not empty, lets search the API for books

    if (e.target.value !== "") {
      console.log("start search with ", querytext);
      BooksAPI.search(querytext).then(books => {
        this.setState({ books: books || [] });
        //console.log ("books retrieved for '" + this.state.query + "' : " + books.length);
        //console.log ( books);
        //console.log ( this.state.books);
      });
    } else {
      console.log("empty string, no search made"); // if the search term is empty, skip it
    }

    // }
  };

  // -----------------------------------------

  render() {
    const { books } = this.state;
    const query = this.state.query;
    let isHidden, isVisible;

    if (query === "") {
      isHidden = "hidden";
    } else {
      isVisible = "hidden";
      isHidden = "";
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              tabIndex="0"
              type="text"
              placeholder="Search by title or author"
              onKeyUp={this._handleKeyPress}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className={isVisible} id="items">
            For best results, please use any of the following items: <br />
            <br />
            Android, Art, Artificial Intelligence, Astronomy, Austen, Baseball,
            Basketball, Bhagat, Biography, Brief, Business, Camus, Cervantes,
            Christie, Classics, Comics, Cook, Cricket, Cycling, Desai, Design,
            Development, Digital Marketing, Drama, Drawing, Dumas, Education,
            Everything, Fantasy, Film, Finance, First, Fitness, Football,
            Future, Games, Gandhi, Homer, Horror, Hugo, Ibsen, Journey, Kafka,
            King, Lahiri, Larsson, Learn, Literary Fiction, Make, Manage,
            Marquez, Money, Mystery, Negotiate, Painting, Philosophy,
            Photography, Poetry, Production, Programming, React, Redux, River,
            Robotics, Rowling, Satire, Science Fiction, Shakespeare, Singh,
            Swimming, Tale, Thrun, Time, Tolstoy, Travel, Ultimate, Virtual
            Reality, Web Development, iOS
          </div>

          <div className={isHidden} id="searchBar">
            {" "}
            Search Results for "<strong>{query}</strong>":{" "}
            {books ? books.length : 0} books found{" "}
          </div>
          <ol id="books-grid" className={isHidden}>
            {books.length > 0 ? (
              books.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    onUpdateBook={this.updateBook}
                    defaultShelf={this.findShelf(book)}
                  />
                </li>
              ))
            ) : (
              <br />
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";
//import BookShelf from './Bookshelf'

class Shelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  state = {
    wantToReadCss: "",
    readCss: "",
    currentlyReadingCss: ""
  };

  updateBook = book => {
    this.props.onUpdateBook(book);
  };

  setbooklist = (id, e) => {
    e.preventDefault();

    if (id === "wantToRead")
      this.setState({
        wantToReadCss: "active",
        readCss: "hide",
        currentlyReadingCss: "hide"
      });

    if (id === "read")
      this.setState({
        wantToReadCss: "hide",
        readCss: "active",
        currentlyReadingCss: "hide"
      });

    if (id === "currentlyReading")
      this.setState({
        wantToReadCss: "hide",
        readCss: "hide",
        currentlyReadingCss: "active"
      });
  };

  render() {
    let currentlyReading = this.props.books.filter(
      book => book.shelf === "currentlyReading"
    );
    let wantToRead = this.props.books.filter(
      book => book.shelf === "wantToRead"
    );
    let read = this.props.books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="sidebar">
          <a
            className={"sidebar-link " + this.state.currentlyReadingCss}
            onClick={evt => this.setbooklist("currentlyReading", evt)}
          >
            Currently Reading ( {currentlyReading.length} )
          </a>
          <a
            className={"sidebar-link " + this.state.wantToReadCss}
            onClick={evt => this.setbooklist("wantToRead", evt)}
          >
            Want to Read ( {wantToRead.length} )
          </a>
          <a
            className={"sidebar-link " + this.state.readCss}
            onClick={evt => this.setbooklist("read", evt)}
          >
            Read ( {read.length} )
          </a>

          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>

        <div className="list-books-content">
          <div>
            <div className={"bookshelf " + this.state.currentlyReadingCss}>
              <h2 className="bookshelf-title">
                Currently Reading ( {currentlyReading.length} )
              </h2>
              <div className="bookshelf-books">
                <ol id="books-grid">
                  {currentlyReading.map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateBook={this.updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className={"bookshelf " + this.state.wantToReadCss}>
              <h2 className="bookshelf-title">
                Want to Read ( {wantToRead.length} )
              </h2>
              <div className="bookshelf-books">
                <ol id="books-grid">
                  {wantToRead.map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateBook={this.updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className={"bookshelf " + this.state.readCss}>
              <h2 className="bookshelf-title">Read ( {read.length} )</h2>
              <div className="bookshelf-books">
                <ol id="books-grid">
                  {read.map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateBook={this.updateBook} />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Shelves;

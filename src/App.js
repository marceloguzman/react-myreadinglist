import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelves from './components/Shelves'
import Search from './components/Search'


class MyReadsBooksApp extends React.Component {
  state= {
    books: [],
  }


// when the componet is ready, it read the API an gets the books
  componentDidMount(){
    BooksAPI.getAll()
     .then( books => {
       this.setState({books});
       console.log ("All books retrieved...");
     } )
  }

  
// methods -----------------------------------------------------------

  updateBook = book => {
    
    let temp= this.state.books;
    let findBook = temp.find( b => b.id === book.id ); 

    if (findBook) {
          temp.find( b => b.id === book.id ).shelf = book.shelf;  //book exists, just update the shelf
      } else {
          temp.push(book); // the book is new, let's add it
    }

    this.setState( state => ({
      books: temp
    }));

    BooksAPI.update(book, book.shelf);

  }




  handleChangeShelf = (book: any, shelf: string) => {
    BooksAPI.update(book, shelf).then(response => {
      this.getBooksOnShelf();
    });
  };

  getBooksOnShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }




// render -----------------------------------------------------------
  render() {
    return (
      <div className="app">


<div className="header"> 
        <div className="boxed centered"><span>MGV</span></div>
          <div className="list-books-title centered">
          <h1>My Reading List</h1>
        </div>
</div>

        <Route path="/" exact render={ () => (<Shelves onUpdateBook={this.updateBook} books={this.state.books}/> )} />
        <Route path="/search" exact render={ () => ( <Search onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} onUpdateBook={this.updateBook} /> )} />
      </div>
    )
  }
}

export default MyReadsBooksApp


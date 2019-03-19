import React, { Component } from "react";
import PropTypes from "prop-types";

class Select extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  handleSelect = e => {
    e.preventDefault();
    const book = this.props.book;
    book.shelf = e.target.value;
    this.props.onUpdateBook(book);
  };

  render() {
    const shelfCheckBox = this.props.book.shelf || this.props.default;

    //console.log ("shelfCheckBox", shelfCheckBox);

    return (
      <select onChange={e => this.handleSelect(e)} value={shelfCheckBox}>
        <option value="disabled" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    );
  }
}

export default Select;

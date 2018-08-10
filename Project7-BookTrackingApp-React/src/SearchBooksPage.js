import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BooksGrid from './BooksGrid'
import SearchForm from './SearchForm'

class SearchBooksPage extends Component {
    static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
  }

  updateQuery = (query) => {
    this.setState({ query: query})
    console.log(query)
  }

  selectionUpdate = (selection, id)=> {
    this.props.selectionUpdate(selection, id)
    console.log(selection)
  }

render() {

    const {books,shelf} = this.props
    const {query, selected} = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(`${book.authors} ${book.title}`))
    } else {
      showingBooks = books
    }


    return(
      <div>
        <SearchForm updateQuery={this.updateQuery}/>
        <BooksGrid shelfToRender={shelf.none} Books={showingBooks} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.currently} Books={showingBooks} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.want} Books={showingBooks} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.read} Books={showingBooks} selectionUpdate={this.selectionUpdate}/>
</div>

    )
}
}

export default SearchBooksPage;

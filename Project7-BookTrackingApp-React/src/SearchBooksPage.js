import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BooksGrid from './BooksGrid'
import SearchForm from './SearchForm'
import * as BooksAPI from './BooksAPI'
import {ValidSearchTerms} from './ValidSearchTerms'

const ValidSearchTermsToLowerCase = ValidSearchTerms.map((term) => term.toLowerCase());
class SearchBooksPage extends Component {
    static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
    searched: []
  }

  updateQuery = (query) => {
    this.setState({ query: query})
  }



  selectionUpdate = (selection, book)=> {
    this.props.selectionUpdate(selection, book)
    let ChangedBookIndex = this.state.searched.findIndex(x => x.id === book.id)
    let books = Object.assign([], this.state.searched)
    books[ChangedBookIndex].shelf = selection
    BooksAPI.update(book, selection)
  }

isValidSearchCheck = (query) => {
  if(query !==''){
  return ValidSearchTermsToLowerCase.indexOf(query.toLowerCase()) !== -1;
}
}


render() {

    const {books,shelf, checkBookShelfAssignment} = this.props
    const {query, searched} = this.state

    if (query) {
      if (this.isValidSearchCheck(query)){
      BooksAPI.search(query).then((booksfound)=> {
        booksfound.map((book) => checkBookShelfAssignment(book))
        this.setState({searched : booksfound})
      })} else {
  }}

    return(
      <div>
        <SearchForm updateQuery={this.updateQuery}/>
        <BooksGrid shelfToRender={shelf.none} Books={this.state.searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.currently} Books={this.state.searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.want} Books={searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.read} Books={searched} selectionUpdate={this.selectionUpdate}/>
</div>
    )
}
}

export default SearchBooksPage;

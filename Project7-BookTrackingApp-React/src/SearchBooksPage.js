import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'
import SearchForm from './SearchForm'
import * as BooksAPI from './BooksAPI'
import {ValidSearchTerms} from './ValidSearchTerms'

const ValidSearchTermsToLowerCase = ValidSearchTerms.map((term) => term.toLowerCase().trim());

class SearchBooksPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    selectionUpdate: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searched: [],
  }

  updateQuery = (query) => {
    this.setState({ query: query})
  }

  isValidSearchCheck = (query) => {
    if(query !==''){
    return ValidSearchTermsToLowerCase.indexOf(query.toLowerCase().trim()) !== -1;
  }
  }

  selectionUpdate = (selection, book) => {
    BooksAPI.update(book, selection)
    let currentBooks = this.state.books
    let bookInLibraryCheck = currentBooks.find((currentbook) => book.id === currentbook.id)
    if(!bookInLibraryCheck && (selection !== 'none')){
      var newArray = Object.assign([], this.state.books)
      newArray.push(book)
      this.setState({searched: newArray})
      return
    }
    let ChangedBookIndex = this.state.books.findIndex(x => x.id === book.id)
    let books = Object.assign([], this.state.books)
    books[ChangedBookIndex].shelf = selection
    this.setState({serched: books})
  }

render() {

    const {shelf, checkBookShelfAssignment} = this.props
    const {query, searched} = this.state

  if (query) {
           if (this.isValidSearchCheck(query)){
      BooksAPI.search(query.toLowerCase().trim(), 5).then((booksfound)=> {
        booksfound.map((book) => checkBookShelfAssignment(book))
        this.setState({searched : booksfound})
      })} else {
  }}

    return(
      <div>
        <SearchForm emptyQuery={this.emptyQuery} updateQuery={this.updateQuery}/>
        <BooksGrid shelfToRender={shelf.none} books={searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.currently} books={searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.want} books={searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.read} books={searched} selectionUpdate={this.selectionUpdate}/>
</div>
    )
}
}

export default SearchBooksPage;

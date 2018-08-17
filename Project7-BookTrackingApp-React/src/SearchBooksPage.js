import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'
import SearchForm from './SearchForm'
import * as BooksAPI from './BooksAPI'

class SearchBooksPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    selectionUpdate: PropTypes.func.isRequired
  }

  state = {
    query: '',
    searched: [],
    validTerm: true
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    if (query !== '') {
      if ((query)) {
        
        BooksAPI.search(query)
        .then((booksfound) => {
          booksfound.map((book) => this.props.checkBookShelfAssignment(book))
          this.setState({ searched: booksfound, validTerm: true})
        })
        .catch((error) => {
          this.setState({validTerm: false})
        })
      }  
    } else if (query === '') {
      this.setState({
        searched: [],
        query: ''
      })
    }
    }

  selectionUpdate = (selection, book) => {
    BooksAPI.update(book, selection)
    let ChangedBookIndex = this.state.searched.findIndex(x => x.id === book.id)
    let books = Object.assign([], this.state.searched)
    books[ChangedBookIndex].shelf = selection
    this.setState({searched: books})
    this.props.selectionUpdate(selection, book)
  }

render() {

    const {shelf} = this.props
    const {searched, validTerm} = this.state

    return(
      <div>
        <SearchForm updateQuery={this.updateQuery} validTerm={validTerm}/>
        <BooksGrid shelfToRender={shelf.none} books={searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.currently} books={searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.want} books={searched} selectionUpdate={this.selectionUpdate}/>
        <BooksGrid shelfToRender={shelf.read} books={searched} selectionUpdate={this.selectionUpdate}/>
</div>
    )
}
}

export default SearchBooksPage;

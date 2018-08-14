import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router'
import SearchBooksPage from './SearchBooksPage'
import * as BooksAPI from './BooksAPI'
import MainPage from './MainPage'

class BooksApp extends React.Component {
  state = {
    books: []
  }

 shelf = {
    none: {
      selected: 'none',
      h2: 'Unassigned Books'
    },
    currently:
    {
      selected: 'currentlyReading',
      h2: 'Currently Reading'
    },
    read: {
      selected: 'read',
      h2: 'Read Books'
    },
    want: {
      selected: 'wantToRead',
      h2: 'Want to Read Books'
    }
  }

    componentDidMount(){
      BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    }
// Check if books were alredy assigned to a shelf, if not assign shelf 'none'
  checkBookShelfAssignment = (bookcheck) => {
      const currentBooks = this.state.books
      let bookShelfAssignment = currentBooks.find((book) => book.id === bookcheck.id)
      if(bookShelfAssignment){
        let bookShelf = bookShelfAssignment.shelf
        return bookcheck.shelf = bookShelf
      } else {
        bookcheck.shelf = 'none'
        return
      }
    }
// Update selection both on the server and on the current state as well
    selectionUpdate = (selection, book) => {
      BooksAPI.update(book, selection)
      let currentBooks = this.state.books
      let bookInLibraryCheck = currentBooks.find((currentbook) => book.id === currentbook.id)
      if(!bookInLibraryCheck && (selection !== 'none')){
        var newArray = Object.assign([], this.state.books)
        newArray.push(book)
        this.setState({books:newArray})
        return
      }
      let ChangedBookIndex = this.state.books.findIndex(x => x.id === book.id)
      let books = Object.assign([], this.state.books)
      books[ChangedBookIndex].shelf = selection
      this.setState({books})
    }

  render() {
    return (
      <div>
        <Route path = '/search'
        render = {() => (
        <SearchBooksPage
        checkBookShelfAssignment={this.checkBookShelfAssignment}
        books = {this.state.books} selectionUpdate={this.selectionUpdate} shelf={this.shelf}/>
    )}/>
    <Route exact path = '/'
    render = {() => (
      <div>
      <MainPage books ={this.state.books} shelf={this.shelf} selectionUpdate={this.selectionUpdate}/>
    </div>
)}/>
      </div>
    )
  }
}

export default BooksApp

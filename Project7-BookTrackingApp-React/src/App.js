import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Router, Route, Switch} from 'react-router'
import SearchBooksPage from './SearchBooksPage'
import * as BooksAPI from './BooksAPI'
import MainPage from './MainPage'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
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
          //change all selected values to none as per project requirement
          let booksSelectedNone = books.map((book) => book.shelf = 'none')
      this.setState({ books })
    })
    }


    selectionUpdate = (selection, id) => {
      let ChangedBookIndex = this.state.books.findIndex(x => x.id === id)
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

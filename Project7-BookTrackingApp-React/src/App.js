import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Router, Route, Switch} from 'react-router'
import SearchBooksPage from './SearchBooksPage'
import * as BooksAPI from './BooksAPI'
import Header from './Header'
import OpenSearch from './OpenSearch'

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

    componentDidMount(){
        BooksAPI.getAll().then((books) => {
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
        books = {this.state.books} selectionUpdate={this.selectionUpdate}/>
    )}/>
    <Route exact path = '/'
    render = {() => (
      <div>
      <Header/>
    <OpenSearch/>
    </div>
)}/>
      </div>
    )
  }
}

export default BooksApp

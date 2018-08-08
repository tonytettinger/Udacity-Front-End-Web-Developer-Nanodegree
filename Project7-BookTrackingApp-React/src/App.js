import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import {Router, Route, Switch} from 'react-router'
import SearchBooks from './SearchBooks'
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
            console.log(this.state.books)
            this.state.books.map((book)=>( book.selected = 'read'))
    })
    }

  render() {
    return (
      <div>
        <Route path = '/search'
        render = {() => (
        <SearchBooks
        books = {this.state.books}/>
    )}/>
    <Route path = '/'
    render = {() => (

    <OpenSearch/>
)}/>
      </div>
    )
  }
}

export default BooksApp

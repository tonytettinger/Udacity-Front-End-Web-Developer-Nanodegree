import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SearchBooks extends Component {
    static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    query: '',
  }

  updateQuery = (query) => {
    this.setState({ query: query})
  }

  updateSelected = (selected) => {
    this.setState((prevState) => ({
    books: {
        ...prevState.books,
        selected: selected
    }
}))
  }

render() {

    const {books} = this.props
    const {query, selected} = this.state

    let showingBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(`${book.authors} ${book.title}`))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('name'))

    return(
        <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"  onChange={(event) => this.updateQuery(event.target.value)}/>

              </div>
            </div>

        <ol className='books-grid'>
        {showingBooks.map((book) =>(
        <li key={book.title}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={selected}
                            onChange={(event) => this.updateSelected(event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                        </div>
</li>
    ))}
</ol>

</div>

    )
}
}

export default SearchBooks;

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class SearchForm extends Component {

updateQuery = (value)=> {
  this.props.updateQuery(value)
}

render() {
    return(
      <div className="app">
      <div className="search-books">
          <div className="search-books-bar">
            <Link onClick={this.props.emptyQuery} className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"  onChange={(event) => this.updateQuery(event.target.value)}/>
            </div>
          </div>
            <div className="search-books-results">
                 <ol className="books-grid"></ol>
             </div>
          </div>
          </div>

    )
}
}

export default SearchForm;

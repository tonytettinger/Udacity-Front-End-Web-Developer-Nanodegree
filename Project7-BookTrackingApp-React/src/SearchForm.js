import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary'
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
              {this.props.validTerm === false && 
              (<p>This app has a limited number of search terms please see the Readme file.</p>)
              }
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

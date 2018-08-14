import React, { Component } from 'react';
import Header from './Header'
import OpenSearch from './OpenSearch'
import BooksGrid from './BooksGrid'

class MainPage extends Component {

render() {
  const {books, shelf, selectionUpdate} = this.props
    return(
      <div>
      <Header/>
      <BooksGrid shelfToRender={shelf.currently} books={books} selectionUpdate={selectionUpdate}/>
      <BooksGrid shelfToRender={shelf.want} books={books} selectionUpdate={selectionUpdate}/>
      <BooksGrid shelfToRender={shelf.read} books={books} selectionUpdate={selectionUpdate}/>
      <OpenSearch/>
      </div>
    )
}
}

export default MainPage;

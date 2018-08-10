import React, { Component } from 'react';
import Header from './Header'
import OpenSearch from './OpenSearch'
import BooksGrid from './BooksGrid'

class MainPage extends Component {
  selectionUpdate = (selection, id)=> {
    this.props.selectionUpdate(selection, id)
    console.log(selection)
  }
render() {
  const {books, shelf, selection} = this.props
    return(
      <div>
      <Header/>
      <BooksGrid shelfToRender={shelf.none} Books={books} selectionUpdate={this.selectionUpdate}/>
      <BooksGrid shelfToRender={shelf.currently} Books={books} selectionUpdate={this.selectionUpdate}/>
      <BooksGrid shelfToRender={shelf.want} Books={books} selectionUpdate={this.selectionUpdate}/>
      <BooksGrid shelfToRender={shelf.read} Books={books} selectionUpdate={this.selectionUpdate}/>
      <OpenSearch/>
      </div>
    )
}
}

export default MainPage;

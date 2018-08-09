import React, { Component } from 'react'

class BooksGrid extends Component {

  selectionUpdate = (selection, id)=> {
    this.props.selectionUpdate(selection, id)
    console.log(selection)
    console.log(id)
  }

render() {
  const{showingBooks} = this.props
    return(
      <ol className='books-grid'>
      {showingBooks.map((book) =>(
      <li key={book.title}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf}
                          onChange={(event) => {
                            this.selectionUpdate(event.target.value, book.id)
                          }}>
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
    )
}
}

export default BooksGrid;

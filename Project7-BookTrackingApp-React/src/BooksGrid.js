import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BooksGrid extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    selectionUpdate: PropTypes.func.isRequired
  }


render() {
  const{books, shelfToRender} = this.props
  const checkThumbnailIsDefined = (book) =>{
  return book.hasOwnProperty('imageLinks')
}

    return(
      <div className="bookshelf">
                        <h2 className="bookshelf-title">{shelfToRender.h2}</h2>
                        <div className="bookshelf-books">
      <ol className='books-grid'>
      {books.map((book) =>(
  book.shelf === shelfToRender.selected &&(
   <li key={book.id}>
                     <div className="book">
                       <div className="book-top">
                       {checkThumbnailIsDefined(book) ?
                         (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>)
                         : (<div className="book-cover" style={{ width: 128, height: 193 }}> No image available</div>)
                       }

                         <div className="book-shelf-changer">
                           <select value={book.shelf}
                         onChange={(event) => {
                           this.props.selectionUpdate(event.target.value, book)
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
  )
))}
</ol>
</div>
</div>
    )
}
}

export default BooksGrid;

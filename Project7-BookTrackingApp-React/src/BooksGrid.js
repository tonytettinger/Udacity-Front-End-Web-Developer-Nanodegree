import React, { Component } from 'react'

class BooksGrid extends Component {

  selectionUpdate = (selection, id)=> {
    this.props.selectionUpdate(selection, id)
    console.log(selection)
    console.log(id)
  }

render() {
  const{Books, shelfToRender} = this.props

    return(
      <div className="bookshelf">
                        <h2 className="bookshelf-title">{shelfToRender.h2}</h2>
                        <div className="bookshelf-books">
      <ol className='books-grid'>
      {Books.map((book) =>(
  book.shelf === shelfToRender.selected &&(

   <li key={book.title}>
                     <div className="book">
                       <div className="book-top">
                         <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
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

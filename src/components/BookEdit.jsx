import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

function BookEdit({ book, onSubmit }) {
  const [newTitle, setNewTitle] = useState(book.title);
  const { editBookById } = useBooksContext();

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit();
    editBookById(book.id, newTitle);
  };

  return (
    <form onSubmit={handleSubmit} className="book-edit">
      <label>Title</label>
      <input
        value={newTitle}
        className="input"
        onChange={e => setNewTitle(e.target.value)}
      />
      <button className="button is-primary">Save</button>
    </form>
  );
}

export default BookEdit;

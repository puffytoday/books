import { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

function BookCreate() {
  const [title, setTitle] = useState("");
  const { createBook } = useBooksContext();

  const handleChange = e => setTitle(e.target.value);

  const handleSubmit = e => {
    createBook(title);
    setTitle("");
    e.preventDefault();
  };

  return (
    <div className="book-create">
      <h3>Add a book</h3>
      <form onSubmit={handleSubmit}>
        <label className="label">Title</label>
        <input
          className="input is-success"
          value={title}
          onChange={handleChange}
        />
        <button className="button is-primary">Create</button>
      </form>
    </div>
  );
}

export default BookCreate;

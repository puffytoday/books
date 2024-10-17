import { useEffect, useState } from "react";
import BookList from "./components/BookList";
import BookCreate from "./components/BookCreate";
import axios from "axios";

const DB_SERVER = "http://localhost:5174/books";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get(DB_SERVER);
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async title => {
    const response = await axios.post(DB_SERVER, { title });
    setBooks([...books, response.data]);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`${DB_SERVER}/${id}`, { title: newTitle });

    const updatedBooks = books.map(book => {
      if (book.id === id) return { ...book, ...response.data };
      return book;
    });

    setBooks(updatedBooks);
  };

  const deleteBookById = async id => {
    await axios.delete(`${DB_SERVER}/${id}`);
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;

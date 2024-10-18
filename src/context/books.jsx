import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();
const DB_SERVER = "http://localhost:5174/books";

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get(DB_SERVER);
    setBooks(response.data);
  };

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

  const valueToShare = {
    books,
    fetchBooks,
    createBook,
    editBookById,
    deleteBookById,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;

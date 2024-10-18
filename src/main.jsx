import "./main.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./context/books.jsx";

createRoot(document.getElementById("root")).render(
  <Provider>
    <App />
  </Provider>
);

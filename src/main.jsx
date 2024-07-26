import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import  AuthProvider  from "./context/AuthProvider";
import { QueryProvider } from "./lib/react-query/QueryProvider";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);

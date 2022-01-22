import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./authContext/AuthContext";
import { UserContextProvider } from "./admin/context/userContext/userContext";
import { MovieContextProvider } from "./admin/context/movieContext/movieContext";

ReactDOM.render(
  <React.StrictMode>
    <MovieContextProvider>
      <UserContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UserContextProvider>
    </MovieContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

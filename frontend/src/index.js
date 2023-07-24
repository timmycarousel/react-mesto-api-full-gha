import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Footer from "./components/Footer";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <div className="html">
      <div className="page">
        <App />
        <Footer />
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import _ from "underscore";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

Axios.defaults.baseURL = "http://localhost:3000/api";
// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (!_.isEmpty(token)) {
      config.headers.Authorization = token;
    }
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

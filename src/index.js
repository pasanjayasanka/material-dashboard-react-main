/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import axios from "axios";
// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.interceptors.request.use(
  (config) => {
    const temp = config;
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    if (token) temp.headers.Authorization = `Bearer ${token}`;
    return temp;
  },
  (error) => Promise.reject(error)
);

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

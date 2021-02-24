import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import movies from "./reducers";
import "./index.css";
import App from "./component/App";

const store = createStore(movies);
// console.log("store", store);
// console.log("store-data", store.getState());

// store.dispatch({
//   type: "ADD_MOVIES",
//   movies: [{ name: "JUSTICE-LEAGUE" }],
// });
// console.log("store-data", store.getState());

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);

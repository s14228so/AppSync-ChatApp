import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import ErrorBoundary from "./components/ErrorBoundary"

ReactDom.render(
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>, 
                document.getElementById("root"));
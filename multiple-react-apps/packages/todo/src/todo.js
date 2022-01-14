import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { glazeReact } from "glaze-ui";

export const {mount, unmount} = glazeReact(
  App,
  React, 
  ReactDOM,

  // optional for hot reloading (no problem to deploy to production)
  (props, container) => {
    if (module.hot) {
      module.hot.accept('./App.js', function() {
        const NextApp = require('./App.js').default;
        ReactDOM.render(<NextApp {...props} />, container);
      })
    }
  },
);
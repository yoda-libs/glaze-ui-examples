import React from "react";
import ReactDOM from "react-dom";
import Root from "./root.component";
import { glazeReact } from "glaze-ui";

export const {mount, unmount} = glazeReact(
  Root,
  React, 
  ReactDOM,

  // optional for hot reloading (no problem to deploy to production)
  (props, container) => {
    if (module.hot) {
      module.hot.accept('./root.component.js', function() {
        const NextApp = require('./root.component.js').default;
        ReactDOM.render(<NextApp {...props} />, container);
      })
    }
  },
);
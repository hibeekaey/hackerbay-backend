/*!
 * backend
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import login from "./login";
import jsonp from "./jsonp";
import thumb from "./thumb";

// set up a route index model and pass it using module.exports
export function mount(app) {
  app.use("/login", login); // login route
  app.use("/jsonp", jsonp); // json patch route
  app.use("/thumb", thumb); // thumbnail route
}
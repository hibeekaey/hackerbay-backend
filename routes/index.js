/*!
 * backend
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

const login = require("./login");
const jsonp = require("./jsonp");
const thumb = require("./thumb");

// set up a route index model and pass it using module.exports
module.exports = {
  mount: (app) => {
    app.use('/login', login); // login route
    app.use('/jsonp', jsonp); // json patch route
    app.use('/thumb', thumb); // thumbnail route
  }
};
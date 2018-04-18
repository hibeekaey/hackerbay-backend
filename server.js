/*!
 * backend
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const dotenv = require("dotenv").config();
const routes = require("./routes");

// initialize app
let app = express();

let logDirectory = `${process.cwd()}/logs`; // log directory
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log only 4xx and 5xx responses to console
app.use(morgan("dev", {
  skip: function (req, res) { return res.statusCode < 400; }
}));

// log all requests to access.log
app.use(morgan("common", {stream: accessLogStream}));

// use app routes
routes.mount(app);

// listen to the app on port process.env.PORT
app.listen(process.env.PORT, () => console.log(`App listening on port ${process.env.PORT}`));
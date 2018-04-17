/*!
 * backend
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const fs = require("fs");

// // set up a authentication model and pass it using module.exports
module.exports = (req, res, next) => {
  if (req.body.me) { // check if user is already authenticated
    console.log('User authenticated');
  } else if (req.body.username && req.body.password) { // authenticate user
    fs.readFile(`${process.cwd()}/data/users.json`, (err, data) => { // get users json data
      if (err) throw err;
      
      let users = JSON.parse(data);
    });
  } else { // response if failed
    res.status(401).json({"status": "error", "message": "user authentication required"});
  }

  next(); // proceed to the next middleware
};
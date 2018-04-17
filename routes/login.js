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
const auth = require("../lib/auth"); // require authentication module

// use express router
const router = express.Router();

// define the login route
router.post("/", auth, (req, res) => {
  res.send("LOGIN");
});

// set up a router and pass it using module.exports
module.exports = router;
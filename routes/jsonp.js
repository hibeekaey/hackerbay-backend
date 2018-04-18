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
const jsonpatch = require("jsonpatch");

// use express router
const router = express.Router();

// define the jsonp route
router.post("/", auth, async (req, res) => {
  try {
    // apply the json patch to the request body data
    // and send a response with the patched object
    let data = await jsonpatch.apply_patch(req.body.data, req.body.patch);
    
    res.status(201).json({
      status: "success",
      message: "json patch operation completed",
      data: data // patched response data
    });
  } catch(err) {
    res.status(400).json({
      status: "error",
      message: "json patch operation failed"
    });
  }
});

// set up a router and pass it using module.exports
module.exports = router;
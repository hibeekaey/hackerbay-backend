/*!
 * backend
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import express from "express";
import auth from "../lib/auth"; // import authentication module
import thumb from "../lib/thumbnail"; // thumbnail generation module

// use express router
const router = express.Router();

// define the thumb route
router.post("/", auth, thumb, (req, res) => {
  // do something with the thumbnail
  res.status(201).json({
    status: "success",
    message: "image thumbnail creation completed",
    data: {
      public_url: req.body.public_url,
      thumbnail_url: res.locals.thumbnail
    }
  });
});

// set up a router and pass it using module.exports
export default router;
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
import auth from "../lib/auth"; // require authentication module
import jimp from "jimp";
import uuid from "uuid/v1"; // timestamp uuid
import url from "url";

// use express router
const router = express.Router();

// define the thumb route
router.post("/", auth, (req, res) => {
  if (req.body.public_url) {
    // open the file in the public url
    jimp.read(req.body.public_url, (err, image) => {
      if (err) { // jimp failed
        res.status(400).json({
          status: "error",
          message: "image thumbnail creation failed"
        });
      } else {
        // filepath for image thumbnail
        let filename = `${uuid()}.${image.getExtension()}`;
        let filepath = `${process.cwd()}/public/imgs/${filename}`;
        
        // set up thumbnail public url
        let origin = url.format({ // format origin
          protocol: req.protocol,
          host: req.get("host")
        });
        
        let thumbnail = `${origin}/imgs/${filename}`; // thumbnail_url

        image.cover(50, 50) // resize to 50x50 pixels keeping aspect ratio
          .write(filepath); // save to public url locally

        res.status(201).json({
          status: "success",
          message: "image thumbnail creation completed",
          data: {
            public_url: req.body.public_url,
            thumbnail_url: thumbnail
          }
        });
      }
    });
  } else {
    res.status(400).json({
      status: "error",
      message: "invalid request"
    });
  }
});

// set up a router and pass it using module.exports
export default router;
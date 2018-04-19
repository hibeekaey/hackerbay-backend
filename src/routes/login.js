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

// use express router
const router = express.Router();

// define the login route
router.post("/", auth);

// set up a router and pass it using module.exports
export default router;
/*!
 * backend
 * Copyright (c) 2017 Ibukun O. Dairo
 * MIT Licensed
 */

"use strict";

/**
 * Module dependencies.
 */

import chai from "chai";
import chaiHttp from "chai-http";

import server from "../src/server"; // server entry point

// set up chai
const should = chai.should();

chai.use(chaiHttp);

describe("Hackerbay Backend", () => {
  let token;
  
  /**
   * Test for active server
   */

  describe("Server", () => {
    it("it should return 200", done => {
      chai.request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  /**
   * Test to authenticate user
   */

  describe("Authentication endpoint", () => {
    let data = { // user data
      username: "hibeekaey",
      password: "hibeekaey"
    };

    it("it should authenticate user", done => {
      chai.request(server)
        .post("/login")
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          
          token = res.body.token; // use token for tests

          done();
        });
    });
  });

  /**
   * Test to patch json data
   */
  
  describe("Jsonp endpoint", () => {
    let data = { // json data with patch object
      "data": {
        "username": "hibeekaey",
        "password": "hibeekaey"
      },
      "patch": [
        { "op": "replace", "path": "/username", "value": "cooluser" },
        { "op": "add", "path": "/role", "value": "admin" },
        { "op": "remove", "path": "/password"}
      ]
    };

    it("it should not patch unauthenticated user's data", done => {  
      chai.request(server)
        .post("/jsonp")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("user authentication required");
          done();
        });
    });

    it("it should patch authenticated user's data", done => {  
      chai.request(server)
        .post("/jsonp")
        .set("x-access-token", token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.have.property("username");
          res.body.data.should.have.property("role");

          done();
        });
    });
  });

  /**
   * Test to process image and return image thumbnail
   */

  describe("Thumb endpoint", () => {
    let data = {
      "public_url": "http://localhost:8080/imgs/12363012.jpeg"
    };

    it("it should not process unauthenticated user's data", done => {  
      chai.request(server)
        .post("/thumb")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("user authentication required");

          done();
        });
    });

    it("it should process authenticated user's data", done => {  
      chai.request(server)
        .post("/thumb")
        .set("x-access-token", token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.have.property("public_url");
          res.body.data.should.have.property("thumbnail_url");

          done();
        });
    });
  });
});
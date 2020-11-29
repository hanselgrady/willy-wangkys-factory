import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";

var express = require("express");
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "willywangky",
    password: "willywangky",
    database: "wsfactory"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database");
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(req, res) {
    con.query("SELECT username, password FROM user where user = '" + req.usernmae + "' and " + " password = '" + req.password + " ';", function(errno, result) {
        if (errno) throw errno;
        // if (res.json(result).length != 0);
        
    });   
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
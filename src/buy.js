import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login.css";
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router-dom';
// var express = require("express");
// var mysql = require("mysql");

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "willywangky",
//     password: "willywangky",
//     database: "wsfactory"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to database");
// });

export default function Buy() {
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [valid, setValid] = useState(false);
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['username'])

  function validateForm() {
    fetch('http://localhost:7000/buy/' + saldo + '/' + id + '/' + amount)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setValid(res['result'] == 'success');
      });
    return valid;
  }

  function handleSubmit(req, res) {
    // con.query("SELECT username, password FROM user where user = '" + req.usernmae + "' and " + " password = '" + req.password + " ';", function(errno, result) {
    //     if (errno) throw errno;
    //     // if (res.json(result).length != 0);
        
    // });  
    fetch('http://localhost:7000/buy' + saldo + '/' + id + '/' + amount)
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }
  if (!userCookie['username']) {
    return <Redirect to='/login' />;
  }

  return (
    <div className="Buy">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="id">
          <Form.Label>Ingerdient Id</Form.Label>
          <Form.Control
            autoFocus
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="saldo">
          <Form.Label>Saldo</Form.Label>
          <Form.Control
            type="number"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Submit
        </Button>
      </Form>
    </div>
  );
}


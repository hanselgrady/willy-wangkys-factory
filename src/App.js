import logo from './logo.svg';
import Login from "./login.js";
import Logout from "./logout.js";
import Buy from "./buy.js";
import './common-fonts.css';
import './common.css';
import './common-navbar.css';
import React, { useParams, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router-dom';

const {JSDOM} = require('jsdom');
const { window } = new JSDOM ('');
const $ = require('jquery')(window);


var fetch = require('node-fetch');
var cors = require('cors');
var soap = require('easy-soap-request');
var tsoap = require('tinysoap');

function App() {
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['username']);
  console.log(userCookie['username']);
  return (
    <Router>
      <div>
        <div className="header">
      {(userCookie['username']) ?
        (
          <ul className="navbar menu-left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/supplierlist">Show Suppliers Price</Link>
            </li>
            <li>
              <Link to="/getsaldo">Show Factory Balance</Link>
            </li>
            <li>
              <Link to="/buy">Buy Ingredients</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        ): (
          <ul className="navbar menu-left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

        )
      }
        </div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div className="thread">
        <Switch>
          <Route path="/supplierlist">
            <SupplierList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/getsaldo">
            <GetSaldo />
          </Route>
          <Route path="/buy">
            <Buy />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['username']);
  if (!userCookie['username']) {
    return <Redirect to='/login' />;
  }
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function RequestList() {
  const [sList, setSList] = useState([]);
    
    // const url = 'http://localhost:9999/ws/saldo/';
    // const sampleHeaders = {
    //   'user-agent': 'sampleTest',
    //   'Content-Type': 'text/xml;charset=UTF-8',
    //   'soapAction': 'http://localhost:9999/ws/saldo?wsdl',
    // };
    // const xml = 
    // '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ndf="https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl">' +
   // '<soapenv:Header/>' +
   // '<soapenv:Body>' +
    //     '<m:getSaldo>' +
            
    //     '</m:getSaldo>' +
   // '</soapenv:Body>' +
// '</soapenv:Envelope>';
    // // usage of module
    // (async () => {
    //   const { response } = await soap({ url: url, headers: sampleHeaders, xml: xml, timeout: 10000 }); // Optional timeout parameter(milliseconds)
    //   const { headers, body, statusCode } = response;
    //   console.log(headers);
    //   console.log(body);
    //   console.log(statusCode);
    // }
    //)();
    //
  var url = 'http://localhost:9999/ws/saldo?wsdl';
  var args = {name: 'value'};
  tsoap.createClient(url, function(err, client) {
      client.MyFunction(args, function(err, result) {
          console.log(result);
      });
  });
}
function GetSaldo() {
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['username']);
  const [val, setVal] = useState([]);
  var url = "http://localhost:9999/ws/saldo";
  var header = {
    "Content-type": "text/xml; charset=utf-8",
    "Access-Control-Allow-Origin": "http://localhost:9999/ws/saldo",
    "Access-Control-Allow-Methods": "GET",
  };
  var xml = 
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://services.factory.ws.jax/">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
        '<ser:getSaldo/>' +
      '</soapenv:Body>' +
    '</soapenv:Envelope>';
  // soap(url, header, xml).then(({response: {body, statusCode}}) => {
  //   console.log(body);
  //   console.log(statusCode);
  // }).catch((errorBody) => {
  //   console.error(errorBody);
  // });
  axios.request({
    method: "get",
    url: url,
    crossDomain: true
  }).then(res => {
    console.log(res.data);
    setVal(res)
  }).catch(err => {
    console.log(err);
  })
  
    if (!userCookie['username']) {
    return <Redirect to='/login' />;
  }
  
  return (
    <div>
      <h2>Saldo Pabrik</h2><br></br>
      <p>{val}</p>
    </div>
  );
}

function SupplierList() {
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['username']);
  const [sList, setSList] = useState([]);

  useEffect(() => {
    let mounted = true;
    fetch('http://localhost:7000/list')
      .then(res => res.json())
      .then(res => {
          if (mounted) {
              setSList(res);
          }
      });
      return () => mounted = false;
  }, []);
  
  if (!userCookie['username']) {
    return <Redirect to='/login' />;
  }
  
  return (
      <div>
          <h2>SupplierList</h2>
          <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Ingredient</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody>
          {sList.map((item, i) => {return(
            <tr>
              <td>{ item.idbahan }</td>
              <td>{ item.namabahan }</td>
              <td>{ item.harga }</td>
            </tr>
          );})}
            </tbody>
          </table>
      </div>
  );

}

export default App;

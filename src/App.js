import logo from './logo.svg';
import './App.css';
import React, { useParams, useCallback, useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Link,
    Route
} from 'react-router-dom';

var fetch = require('node-fetch');
var cors = require('cors');
var soap = require('easy-soap-request');
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/supplierlist">Show Suppliers Price</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about" component = {About} />
          <Route path="/supplierlist" component = {SupplierList} />
          <Route path="/" component = {Home} />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function SupplierList() {
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
  
  return (
      <div>
          <h2>SupplierList</h2>
          <table>
            <thead>
            <tr>
              <th>Ingredients</th>
              <th>Price</th>
            </tr>
            </thead>
            <tbody>
          {sList.map((item, i) => {return(
            <tr>
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

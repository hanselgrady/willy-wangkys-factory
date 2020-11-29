import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import {Redirect} from 'react-router-dom';
export default function Logout() {
  const [userCookie, setUserCookie, removeUserCookie] = useCookies(['username'])
  removeUserCookie('username');
  return <Redirect to='/login' />;
}

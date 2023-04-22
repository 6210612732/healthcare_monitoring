import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie';


function Logout() {
  const [cookies, setCookie] = useCookies(['id','person']);
  function tt(nid) {
    setCookie('id', nid, { path: '/' });
  }
  function ff(person) {
    setCookie('person', person, { path: '/' });
  }
    tt("0")
    ff("_")
  useEffect(() => {
    window.location.replace('/');
  },[]);

  
}
export default Logout;
//<Navigate to="/doctor/signup_doctor" replace={true} />


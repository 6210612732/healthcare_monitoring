import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default class Abc extends Component {

  render() {
    return (
        <div >
          <h1>site map</h1><br></br>

          <a href="/demo">demo</a><br></br>
          
          <a href="/patient/signup">sign up patient</a><br></br>

          <a href="/doctor/signup_doctor">sign up doctor</a><br></br>

          <a href="/login">login page</a><br></br>

          <a href="/layout">layout</a><br></br>

          <p>doctor</p>
          <a href="/doctor/dashboard">dashboard doctor</a><br></br>
          <a href="/doctor/chat">chat doctor</a><br></br>
          <a href="/doctor/chat_list">chat list doctor</a><br></br>
          <a href="/doctor/appointment">appointment doctor</a><br></br>
          <a href="/doctor/search">search doctor</a><br></br>
          
          <p>patient</p>
          <a href="/patient/dashboard">dashboard patient</a><br></br>

          

          <br></br><br></br><a href="/logout">logout</a><br></br>


          
          <br></br>
          

        </div>
    )
  }
}

//<Navigate to="/doctor/signup_doctor" replace={true} />


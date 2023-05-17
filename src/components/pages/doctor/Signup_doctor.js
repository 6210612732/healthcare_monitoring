import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,  
  MDBCard,
  MDBCardBody,
  MDBTextArea
}
from 'mdb-react-ui-kit';
import styles from '../../CssComponent/Signup_d.module.css';
import logo from '../../../assets/pic/logo.jpg'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Swal from 'sweetalert2'

export default class Signup extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            tel: '',
            hospital: '',
            des: ''
        }
    }

    onChangeUsername = (e) => {
        this.setState({ username: e.target.value })
        //console.log(this.state);
    }

    onChangeEmail= (e) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onChangetel = (e) => {
        this.setState({ tel: e.target.value })
    }
    onChangehospital = (e) => {
        this.setState({ hospital: e.target.value })
    }
    onChangedes = (e) => {
        this.setState({ des: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("signup success");
        const PObject = {
            username: this.state.username,
            email: this.state.email,
            plainpass: this.state.password,   
            tel: this.state.tel,
            address: this.state.address,  
            detail: [{
                description: this.state.des,
                hospital: this.state.hospital
            }],
            status: "0",
        };
        
        axios.post('http://localhost:8082/api/doctor/create-doctor',PObject).then(res => 
        console.log(res.data));

        Swal.fire({
          icon: 'success',
          title: 'signup success',
          showConfirmButton: false,
          timer: 3000
        }).then(
          () => { window.location.replace('/'); }
       )
        //console.log('student success create ');
    }

    componentDidMount() {
       // When the link is accessed, check if the token is valid and not expired
 const urlParams = new URLSearchParams(window.location.search);
 const tokenFromUrl = urlParams.get('token');
 const expirationFromStorage = sessionStorage.getItem(tokenFromUrl);
 if (expirationFromStorage && new Date().getTime() < expirationFromStorage) {
   // The token is valid and not expired, do something here
   // For example, remove the token from server-side storage to mark it as used
   sessionStorage.removeItem(tokenFromUrl);
 } else {
   window.location.assign('/')
 }
    }





  render() {

     

    return (
        <MDBContainer className={`my-5 ${styles.gradient_form}`}>
            <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '5000px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
          <MDBRow>
            <MDBCol col='6' className="mb-5">
              <div className={`d-flex flex-column  justify-content-center  h-100 mb-4 ${styles.gradient_custom_2}`}>
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">doctor information</h4>
                  <Form.Label>ข้อมูลอื่นๆ :</Form.Label>
                  <MDBInput wrapperClass='mb-4' placeholder='เบอร์โทร' onChange={this.onChangetel} id='form4' type='text'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='โรงพยาบาล' onChange={this.onChangehospital} id='form5' type='email'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='หมายเหตุ เพิ่มเติม' onChange={this.onChangedes} type='text'/>
                </div>
              </div>
            </MDBCol>
            <MDBCol col='6' className="mb-5">
              <div className="d-flex flex-column ms-5">
              <div className="text-center">
                  <img src={require ("../../../assets/pic/logo_r.png")} height={130}
                    alt="logo" />
                  <h4 className="mt-5 mb-5 pb-1">Doctor  Sign up</h4>
                </div>
                <Form onSubmit={this.onSubmit}>
                <MDBInput wrapperClass='mb-4' placeholder='Username' onChange={this.onChangeUsername} id='form3' type='text'/>
                <MDBInput wrapperClass='mb-4' placeholder='Email address' onChange={this.onChangeEmail} id='form1' type='email'/>
                <MDBInput wrapperClass='mb-4' placeholder='Password' onChange={this.onChangePassword} id='form2' type='password'/>
                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn type='submit' className={`mb-0 w-50 ${styles.gradient_custom_2}`}   >Sign up</MDBBtn>
                </div>
                </Form>    
              </div>
            </MDBCol>
          </MDBRow>
          </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
  }
}
//className="mb-0 w-100 styles.gradient-custom-2" 


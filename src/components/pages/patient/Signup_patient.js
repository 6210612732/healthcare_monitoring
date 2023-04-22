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
import styles from '../../CssComponent/Signup_p.module.css';
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
            plainpass: '',
            blood: '',
            tel: '',
            address: '',
            name_sur: '',
            drug: '',
            age: '',
            kg_cm: '',
            allergic: '',
            gender: '',
            chronic_disease: '',
            being_treated: '',
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
        this.setState({ plainpass: e.target.value })
    }

    onChangetel = (e) => {
        this.setState({ tel: e.target.value })
    }
    onChangeaddress = (e) => {
        this.setState({ address: e.target.value })
    }
    onChangename_sur = (e) => {
        this.setState({ name_sur: e.target.value })
    }
    onChangedrug = (e) => {
        this.setState({ drug: e.target.value })
    }
    onChangeblood = (e) => {
        this.setState({ blood: e.target.value })
    }
    onChangeage = (e) => {
        this.setState({ age: e.target.value })
    }
    onChangekg_cm = (e) => {
        this.setState({ kg_cm: e.target.value })
    }
    onChangeallergic = (e) => {
        this.setState({ allergic: e.target.value })
    }
    onChangegender = (e) => {
        this.setState({ gender: e.target.value })
    }
    onChangechronic_disease = (e) => {
        this.setState({ chronic_disease: e.target.value })
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
            plainpass: this.state.plainpass,   
            tel: this.state.tel,
            address: this.state.address,  
            detail: [{
                description: this.state.des,
                name_sur: this.state.name_sur,
                drug: this.state.drug,
                age: this.state.age,
                gender: this.state.gender,
                kg_cm: this.state.kg_cm,
                blood_group: this.state.blood,
                allergy: this.state.allergic, 
                chronic_disease: this.state.chronic_disease,
                being_treated: this.state.being_treated,
            }],
            status: "0",
        };
        
        axios.post('http://localhost:8082/api/patient/create-patient',PObject).then(res => 
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

  render() {
    return (
        <MDBContainer className={`my-5 ${styles.gradient_form}`}>
            <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '5000px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
          <MDBRow>
            <MDBCol col='6' className="mb-5">
              <div className="d-flex flex-column ms-5">

                <div className="text-center">
                  <img src={logo}
                    style={{width: '185px'}} alt="logo" />
                  <h4 className="mt-5 mb-5 pb-1">Patient  Sign up</h4>
                </div>
                <Form onSubmit={this.onSubmit}>
                <MDBInput wrapperClass='mb-4' placeholder='Username' onChange={this.onChangeUsername} id='form3' type='text'/>
                <MDBInput wrapperClass='mb-4' placeholder='Email address' onChange={this.onChangeEmail} id='form1' type='email'/>
                <MDBInput wrapperClass='mb-4' placeholder='Password' onChange={this.onChangePassword} id='form2' type='password'/>
                <div className="text-center pt-1 mb-5 pb-1">
                  <MDBBtn type='submit' className={`mb-0 w-50 ${styles.gradient_custom_2}`}>Sign up</MDBBtn>
                  
                </div>
                </Form>    
              </div>
            </MDBCol>
    
            <MDBCol col='6' className="mb-5">
              <div className={`d-flex flex-column  justify-content-center  h-100 mb-4 ${styles.gradient_custom_2}`}>
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">patient information</h4>
                  <Form.Label>ข้อมูลอื่นๆ :</Form.Label>
                  <MDBInput wrapperClass='mb-4' placeholder='ชื่อ-นามสกุล' onChange={this.onChangename_sur}  type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='เบอร์โทร' onChange={this.onChangetel} id='form4' type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='ที่อยู่' onChange={this.onChangeaddress} id='form5' type='email'/>
                  <MDBInput wrapperClass='mb-4' placeholder='เพศ' onChange={this.onChangedrug}  type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='กรุ๊ปเลือด' onChange={this.onChangeblood}  type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='อายุ' onChange={this.onChangeage} type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='น้ำหนัก/ส่วนสูง (kg/cm)' onChange={this.onChangekg_cm} type='text'/>
                  <MDBInput wrapperClass='mb-4' placeholder='แพ้ยา' onChange={this.onChangedrug}  type='text'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='อาการแพ้' onChange={this.onChangeallergic} type='text'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='โรคประจำตัว' onChange={this.onChangechronic_disease} type='text'/>
                  <MDBTextArea wrapperClass='mb-4' placeholder='หมายเหตุ เพิ่มเติม' onChange={this.onChangedes} type='text'/>
                </div>
              </div>
    
            </MDBCol>
          </MDBRow>
          </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      );
  }
}

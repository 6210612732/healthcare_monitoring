import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useCookies,Cookies  } from 'react-cookie';
import {  useEffect } from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cookies, setCookie] = useCookies(['id','person','time_login','urname']);
    const cookies22 = new Cookies();
    const cc = cookies22.get('person')
    function tt(nid) {
      setCookie('id', nid, { path: '/' });
      setCookie('time_login',new Date().getTime(), { path: '/' });

    }
    function ff(person) {
      setCookie('person', person, { path: '/' });
    }
    function gg(urname) {
      setCookie('urname', urname, { path: '/' });
    }
    ////////////////////
    useEffect(() => {
      if(cc=="doctor"){
        window.location.assign("/doctor/dashboard")
      }
      else if(cc=="doctor"){
        window.location.assign("/patient/dashboard")
      }
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const PObject = {
            email: email,
            password: pass,   
        };

        axios.post('http://localhost:8082/api/app/authen',PObject).then(res => {
        console.log(res.data)

        if(res.data.status == "login success"){
        
        tt(res.data.id);
        gg(res.data.urname);
        ff(res.data.person);

          Swal.fire({
            icon: 'success',
            title: res.data.status,
            showConfirmButton: false,
            timer: 2000
          }).then(
            () => { 
              if(res.data.person == "doctor")  window.location.replace('/doctor/dashboard'); 
              else if(res.data.person == "admin")  window.location.replace('/admin/dashboard'); 
              else window.location.replace('/patient/dashboard'); 
            }
         )
        }
        else{
          Swal.fire({
            icon: 'error',
            title: res.data.status,
            showConfirmButton: false,
            timer: 2000
          })
        }
        });
        
    }


    return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <h3 className="fw-bold mb-2 text-center">HealthCare Monitoring</h3>
              <p className="fw-bold mb-2 text-right">ระบบรับค่าจากอุปกรณ์การแพทย์พร้อมแสดงค่าผ่านเว็บ</p>
              <h3 className="fw-bold mb-3 mt-4 text-center">Sign in</h3>

              <form className='form' onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='login' onChange={(e) => setEmail(e.target.value)} type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' onChange={(e) => setPass(e.target.value)} type='password' size="lg"/>

              <div className='d-flex justify-content-between'>
              <MDBBtn size='lg' type="submit" >  Login   </MDBBtn>
              <a href='/patient/signup'>Signup Patient</a>
              </div>
              </form>

              <hr className="my-4" />

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Login;
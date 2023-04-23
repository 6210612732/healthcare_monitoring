import React from 'react'
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useCookies,Cookies  } from 'react-cookie';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
function Appoint() {
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [d_ls, setd_ls] = useState([]);
  let dev_temp = []
  const [cc, setcc] = useState(2);
  const [session, setsession] = useState("");
  const [datee, setdatee] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const url = require('url');
  const current_url = new URL(window.location.href)
  const search_params = current_url.searchParams;
  const cid = search_params.get('cid');
  const zz = new Date()
  const d_day = zz.getFullYear()+"/"+zz.getMonth()+"/"+zz.getDate()
  useEffect(() => {
    axios.get('http://localhost:8082/api/appointment/doc_schedule/'+uid).then(res => {
      setd_ls(res.data)
      console.log(res.data)
    }) 

    
  },[]);

  function handleClose_save(){
    setShow(false);
    //console.log(datee + "  " + session)
    const PObject = {p_id: cid, d_id: uid, appoint:[{date: datee,session: session}],status:"0"}
    axios.post('http://localhost:8082/api/app/make_appointment/',PObject).then(res => {
      if(res.data == "make appoint success"){ Swal.fire("make appoint success", '', 'success')  }
      else{  Swal.fire("That time has already appoint", '', 'error')   }
      setcc(2)
  })
  }



  return (
  <div>
    <MDBBtn rounded className='mx-2' color='info' onClick={handleShow}>
      Make Appointment
    </MDBBtn>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Make Appointment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form>
    <div classname="my-3 mb-5" >select date : </div>
    <Form.Control  className="mt-2 mb-4"type="date" name="dob" placeholder="Date of Birth" onChange={(e)=>{setdatee(e.target.value)}} />
    <div classname="my-3 mt-5" >select session : </div>
    <div>

    <Form.Check 
      type="radio"
      id="1"
      name="group1"
      value="session1"
      label="session 1 : 10:00 - 11:00"
      className="mt-3"
      onChange={(e)=>{setsession(e.target.value)}}
    />
    <Form.Check 
      type="radio"
      id="2"
      name="group1"
      value="session2"
      label="session 2 : 11:00 - 12:00"
      className="mt-3"
      onChange={(e)=>{setsession(e.target.value)}}
    />
    <Form.Check 
      type="radio"
      id="3"
      name="group1"
      value="session3"
      label="session 3 : 13:00 - 14:00"
      className="mt-3"
      onChange={(e)=>{setsession(e.target.value)}}
    />
    <Form.Check 
      type="radio"
      id="4"
      name="group1"
      value="session4"
      label="session 4 : 14:00 - 15:00"
      className="mt-3"
      onChange={(e)=>{setsession(e.target.value)}}
    />
    <Form.Check 
      type="radio"
      id="5"
      name="group1"
      value="session5"
      label="session 5 : 15:00 - 16:00"
      className="mt-3"
      onChange={(e)=>{setsession(e.target.value)}}
    />
    </div>
    </Form>


    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose_save}>
        Save 
      </Button>
    </Modal.Footer>
  </Modal>
  </div>

      

      
  );
}

export default Appoint;


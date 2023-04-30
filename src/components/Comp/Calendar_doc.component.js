import React from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useCookies,Cookies  } from 'react-cookie';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Calendar_doc() {
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [date, setDate] = useState(new Date());
  const [datee, setdatee] = useState({id:"0",appoint:[{date:"0"}]});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [d_ls, setd_ls] = useState([]);
  const [cc, setcc] = useState(2);
  const [user_data, setuser_data] = useState([]);
  let dev_temp = []
   
  
  function re(){
    axios.get('http://localhost:8082/api/appointment/doc_schedule/'+uid).then(res => {
    setd_ls(res.data)
    })}

  useEffect(() => {
    if(cc>0)
    axios.get('http://localhost:8082/api/appointment/doc_schedule/'+uid).then(res => {
      setd_ls(res.data)
      console.log(res.data)
    }) 
    const dd = cc ; setcc(dd-1);
  },[cc,datee,d_ls]);

  function showLog(zz){
    let day = zz.getDate()
    let month = zz.getMonth()+1
    if(zz.getMonth()<10){
      month = '0'+month 
    }
    if(zz.getDate()<10){
      day = '0'+day 
    }
    const d_day = day+"-"+month+"-"+zz.getFullYear()
    const d2_day = zz.getFullYear()+"-"+month+"-"+day
    const found = d_ls.find(element => element.appoint[0].date === d2_day)
    if(found)
    { 
      setdatee(found)
      handleShow(true)
    }
    else{
    const show_text = "don't have any appointment in this day"
    const count = 0
    const temp_text = ""
    Swal.fire({
      title: d_day,
      text: show_text,
      showConfirmButton: false,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      cancelButtonText: `close`,
    })
    }
  }

  function del(found){
    Swal.fire({
      title: 'Cancel Appointment',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const PObject = { _id:found}
        axios.post('http://localhost:8082/api/appointment/delete_appoint',PObject).then(res => {
        if(res.data == "cancel success"){ 
          Swal.fire("cancel success", '', 'success'); setcc(2); handleClose(); re()}}
      )}
    })
  }


  function print_bar(session){
    if(session=="session1"){
      const found = d_ls.find(element => (element.appoint[0].date === datee.appoint[0].date && element.appoint[0].session=="session1"))
      if(found){ return ( <div classname="my-3 mt-5"> session 1 (10:00 - 11:00) : {found.p_uname}  | {found.p_urname}
      <Button variant="danger" className='mx-3 h-1' size="sm" onClick={()=>{del(found._id)}}> X </Button></div>) }
      else{ return ( <div classname="my-3 mt-5"> session 1 (10:00 - 11:00) :  --- </div>) }
    }
    else if(session=="session2"){
      const found = d_ls.find(element => (element.appoint[0].date === datee.appoint[0].date && element.appoint[0].session=="session2"))
      if(found){ return ( <div classname="my-3 mt-5"> session 2 (11:00 - 12:00) : {found.p_uname}  | {found.p_urname}
      <Button variant="danger" className='mx-3 h-1' size="sm" onClick={()=>{del(found._id)}}> X </Button></div>) }
      else{ return ( <div classname="my-3 mt-5"> session 2 (11:00 - 12:00) :  --- </div>) }
    }
    else if(session=="session3"){
      const found = d_ls.find(element => (element.appoint[0].date === datee.appoint[0].date && element.appoint[0].session=="session3"))
      if(found){ return ( <div classname="my-3 mt-5"> session 3 (13:00 - 14:00) : {found.p_uname}  | {found.p_urname}
      <Button variant="danger" className='mx-3 h-1' size="sm" onClick={()=>{del(found._id)}}> X </Button></div>) }
      else{ return ( <div classname="my-3 mt-5"> session 3 (13:00 - 14:00)   :   --- </div>) }
    }
    else if(session=="session4"){
      const found = d_ls.find(element => (element.appoint[0].date === datee.appoint[0].date && element.appoint[0].session=="session4"))
      if(found){ return ( <div classname="my-3 mt-5">  session 4 (14:00 - 15:00) : {found.p_uname}  | {found.p_urname}
      <Button variant="danger" className='mx-3 h-1' size="sm" onClick={()=>{del(found._id)}}> X </Button></div>) }
      else{ return ( <div classname="my-3 mt-5"> session 4 (14:00 - 15:00) :  --- </div>) }
    }
    else if(session=="session5"){
      const found = d_ls.find(element => (element.appoint[0].date === datee.appoint[0].date && element.appoint[0].session=="session5"))
      if(found){ return ( <div classname="my-3 mt-5"> session 5 (15:00 - 16:00) : {found.p_uname}  | {found.p_urname} 
      <Button variant="danger" className='mx-3 h-1' size="sm" onClick={()=>{del(found._id)}}> X </Button></div>) }
      else{ return ( <div classname="my-3 mt-5"> session 5 (15:00 - 16:00) :  --- </div>) }
    }
  }

  function daa(){
    return (
      <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Appointment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div classname="my-3 mb-5" ><h4>date : {datee.appoint[0].date}</h4></div>
    <br></br>
    {print_bar("session1")}
    <br></br>
    {print_bar("session2")}
    <br></br>
    {print_bar("session3")}
    <br></br>
    {print_bar("session4")}
    <br></br>
    {print_bar("session5")}
    <br></br>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
    )
  }
  return (
    <div className=''>
      <h1 className='text-center'>Schedule</h1>
      <div  className="d-flex align-items-center justify-content-center text-center not-found-container my-5 w-100"  >
        
        
        <Calendar 
        
         />

          {daa()}


      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}

export default Calendar_doc;


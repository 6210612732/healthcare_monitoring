import React from 'react'
import { AppContent, AppSidebar_a, AppFooter, AppHeader } from '../../index';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useCookies,Cookies  } from 'react-cookie';

const Dashboard_admin = () => {
  const tableExample = [
    {
      user: {
        name: 'saitama onepunch',
        uname: "mannn7420",
        age: '25',
      },
    },
  ]
  
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [user_data, setuser_data] = useState([]);
  const [mode, setmode] = useState("");
  const [search, setsearch] = useState("");
  const [req_ls, setreq_ls]= useState([]);
  const [cc, setcc] = useState(2);
  let dev_temp = []


  useEffect(() => {
    if(cc>0){
      const PObject2 = { d_id: uid, mode: mode, search: search}
      axios.post('http://localhost:8082/api/following/search_request2',PObject2).then(res => {
      //axios.get('http://localhost:8082/api/following/search_request/'+uid).then(res => {
      setuser_data(res.data)
    })
    const dd = cc 
    setcc(dd-1)
    //console.log(cc)
    }
  },[cc]);

  function search_button(){
    const PObject2 = { d_id: uid, mode: mode, search: search}
      axios.post('http://localhost:8082/api/following/search_request2',PObject2).then(res => {
      //axios.get('http://localhost:8082/api/following/search_request/'+uid).then(res => {
      setuser_data(res.data)
      setcc(0)
    })
  }

  function request_follow(p_id){
    const PObject = { p_id: p_id ,d_id: uid}
    axios.post('http://localhost:8082/api/following/create_request',PObject).then(res => {
    //console.log(res.data)
    setcc(2)
    })
  }

  function delete_doctor(d_id){
    const PObject = {d_id: d_id}
    axios.post('http://localhost:8082/api/doctor/delete_doctor',PObject).then(res => {
    //console.log(res.data)
    setcc(2)
    })
  }

  function generate_sign(){
    // Generate a random token
  const token = Math.random().toString(36).substr(2);

  // Store the token and associate it with an expiration time on the server side
  // You can use any server-side storage mechanism, such as a database or cache
  // Here's an example using sessionStorage:
  const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes from now
  sessionStorage.setItem(token, expirationTime);

  // Create the one-time use link with the token
  const oneTimeLink = `http://localhost:8081/doctor/signup_doctor?token=${token}`;
  Swal.fire({
    title: 'Doctor Signup Link : ' + oneTimeLink,
    showConfirmButton: false,
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
    cancelButtonText: 'Okay',
  })
  }

  function create_bar(index){
    let item = user_data[index]
          return (
            <CTableRow v-for="item in tableItems"  key={index}  >
                            <CTableDataCell className="text-center">
                              {index+1}
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                              <div>{item.detail[0].name_sur}</div>
                              <div className="small text-medium-emphasis">
                                <span>{item.username}</span>
                              </div>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                            <Button key={index} variant="success"  onClick={()=>{window.location.assign('doc_dashboard?cid='+item._id)}}>View</Button>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                            <Button key={index} variant="secondary"  onClick={()=>{window.location.assign('doc_calendar?cid='+item._id)}}>View</Button>
                            </CTableDataCell>
                            <CTableDataCell className="text-center">
                            <div><Button key={index} variant="outline-danger" onClick={() => delete_doctor(item._id)}>Delete</Button></div>
                            </CTableDataCell>
                          </CTableRow>
          )
     }
   

  return (
    <div className="gg">
      <AppSidebar_a />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light ">
        <AppHeader />
        <div className="body flex-grow-1 px-5">
        
        <Container className="mb-3">
          <Row>
            <Col sm={8}>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>{setsearch(e.target.value)}}
                />
                <Button onClick={()=>search_button()}>
                  Search
                </Button>
                <Form.Select className='mx-5' onChange={(e)=>{setmode(e.target.value)}}>
                  <option value="" >all</option>
                  <option value="una" >search with username</option>
                </Form.Select>
                <Button className='w-5' onClick={()=>generate_sign()}>
                  Signup&nbsp;Doctor
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>

        <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                        #
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Doctor</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Dashboard</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Appointment</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Delete</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {user_data.map((item, index) => (
                <CTableBody>
                    
                    {create_bar(index)}
                    
                </CTableBody>
                ))}
              </CTable>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Dashboard_admin


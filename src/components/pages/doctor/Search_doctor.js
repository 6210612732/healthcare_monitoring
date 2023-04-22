import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../index';
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
import { useCookies,Cookies  } from 'react-cookie';

const Search_doctor = () => {
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
  const [user_data2, setuser_data2] = useState([]);
  const [req_ls, setreq_ls]= useState([]);
  const [cc, setcc] = useState(2);
  let dev_temp = []


  useEffect(() => {
    if(cc>0){
      axios.get('http://localhost:8082/api/following/search_request').then(res => {
      setuser_data(res.data)
    })}
    const dd = cc 
    setcc(dd-1)
    console.log(cc)
  },[]);
  console.log(user_data)

  function request_follow(p_id){
    const PObject = { p_id: p_id ,d_id: uid}
    axios.post('http://localhost:8082/api/following/create_request',PObject).then(res => {
    setcc(2)
    })
  }
 function create_button(itemstatus,itemid){
    let check = 0
    if(itemstatus == 0){ return(<div><Button variant="outline-primary" onclick={request_follow(itemid)}>request</Button>{' '}</div>)    }
    else if(itemstatus == 1){ return(<div>waiting</div>) }
    else{return(<div>accept</div>)}
  }

  return (
    <div className="gg">
      <AppSidebar />
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
                />
                <Button>
                  Search
                </Button>
                <Form.Select className='mx-5'>
                  <option value="1" >username</option>
                  <option value="2" >name-surname</option>
                </Form.Select>
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
                    <CTableHeaderCell className="text-center">Patient</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Gender</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">kg/cm</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">description</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">follow</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {user_data.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index} >
                      <CTableDataCell className="text-center">
                        {index+1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.detail[0].name_sur}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.username}</span> | age : {item.detail[0].age}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">

                      {item.detail[0].gender}

                      </CTableDataCell>
                      <CTableDataCell className="text-center">

                      {item.detail[0].kg_cm}

                      </CTableDataCell>
                      <CTableDataCell className="text-center">

                      {item.detail[0].description}


                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        
                       {create_button(item.status,item._id)}

                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Search_doctor



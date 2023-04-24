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
  const [mode, setmode] = useState("");
  const [search, setsearch] = useState("");
  const [req_ls, setreq_ls]= useState([]);
  const [cc, setcc] = useState(2);
  let dev_temp = []


  useEffect(() => {
    if(cc>0){
      const PObject2 = { d_id: uid, mode: mode, search: search}
      axios.post('http://localhost:8082/api/following/search_request',PObject2).then(res => {
      //axios.get('http://localhost:8082/api/following/search_request/'+uid).then(res => {
      setuser_data(res.data)
    })
    const dd = cc 
    setcc(dd-1)
    console.log(cc)
    }
  },[cc]);

  function search_button(){
    const PObject2 = { d_id: uid, mode: mode, search: search}
      axios.post('http://localhost:8082/api/following/search_request',PObject2).then(res => {
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
  function create_bar(index){
    let item = user_data[index]
    if(item.bt_status == '2'){
       return (
         <CTableRow v-for="item in tableItems" color="success" key={index} className='c_hover' onClick={()=>{window.location.assign('info?cid='+item._id)}} >
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
                           following
                         </CTableDataCell>
                       </CTableRow>
       )}
       else if(item.bt_status == '1'){
        return (
          <CTableRow v-for="item in tableItems" color="Light" key={index}  >
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
                            waiting
                          </CTableDataCell>
                        </CTableRow>
        )}
        else if(item.bt_status == '0'){
          return (
            <CTableRow v-for="item in tableItems"  key={index}  >
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
                            <div><Button key={index} variant="outline-primary" onClick={() => request_follow(item._id)}>request</Button></div>
                            </CTableDataCell>
                          </CTableRow>
          )}
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
                  onChange={(e)=>{setsearch(e.target.value)}}
                />
                <Button onClick={()=>search_button()}>
                  Search
                </Button>
                <Form.Select className='mx-5' onChange={(e)=>{setmode(e.target.value)}}>
                  <option value="" >all</option>
                  <option value="una" >search with username</option>
                  <option value="rna" >search with name-surname</option>
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
                    <CTableHeaderCell className="text-center">Kg/cm</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Description</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Follow</CTableHeaderCell>
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

export default Search_doctor


//{create_button(item.status,item._id)}

/*

                      {(() => {
                        if (item.bt_status == '0'){
                            return (
                              <div><Button key={index} variant="outline-primary" onClick={() => request_follow(item._id)}>request</Button></div>
                            )
                          }
                        else if (item.bt_status == '1'){
                          return (
                            <p>waiting</p>
                        )
                        }
                        else if (item.bt_status == '2'){
                          return (
                            <p>accept</p>
                        )
                        }
                    
                        return item.bt_status;
                      })()}
*/
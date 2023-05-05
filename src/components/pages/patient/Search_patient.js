import React from 'react'
import { AppContent, AppSidebar_p, AppFooter, AppHeader } from '../../index';
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
import Swal from 'sweetalert2'

const Search_patient = () => {
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
  const [temp2, settemp2] = useState("");
  const [user_data2, setuser_data2] = useState([]);
  const [req_ls, setreq_ls]= useState([]);
  const [cc, setcc] = useState(2);
  let dev_temp = []


  useEffect(() => {
    if(cc>0){
      axios.get('http://localhost:8082/api/following/my_request/'+uid).then(res => {
      setuser_data(res.data)
    })
    const dd = cc 
    setcc(dd-1)
    console.log(cc)
    }
  },[cc]);
  console.log(user_data)

  function request_accept(d_id){
    Swal.fire({
      title: 'Accept Request?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const PObject = { p_id: uid ,d_id: d_id}
        axios.post('http://localhost:8082/api/following/accept_request',PObject).then(res => {
        if(res.data == "request accepted"){ Swal.fire("request accepted", '', 'success')  }
        else{  Swal.fire("cancel", '', 'error')   }
        setcc(2)
      })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    setcc(2)
  }

  return (
    <div className="gg">
      <AppSidebar_p />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light ">
        <AppHeader />
        <div className="body flex-grow-1 px-5">
        
        <h3 className='text-center mb-4'>Request from doctor</h3>

        <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                        #
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Doctor</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Hospital</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Tel</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Accept</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {user_data.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index} >
                      <CTableDataCell className="text-center">
                        {index+1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.doc_uname}</div>
                        <div className="small text-medium-emphasis">
                          
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">

                      {item.doc_hos}

                      </CTableDataCell>
                      <CTableDataCell className="text-center">

                      {item.doc_tel}

                      </CTableDataCell>
                      <CTableDataCell className="text-center">

                      <div><Button key={index} variant="outline-primary" onClick={() => request_accept(item.d_id)}>request</Button></div>


                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      


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

export default Search_patient


//{create_button(item.status,item._id)}
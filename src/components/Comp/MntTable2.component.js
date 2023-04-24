import React from 'react'
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
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';
import ChartPulse from './ChartPulse.component';
import ChartPressure from './ChartPressure.component';
import ChartOxi from './ChartOxi.component';
import CheckStatus from './CheckStatus.component';

const tableExample = [
    {
      user: {
        name: 'saitama onepunch',
        uname: "mannn7420",
        age: '25',
      },
    },
  ]

const MntTable = ({socket}) => {
  const [token, settoken] = useState("");
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [cc, setcc] = useState(1);
  const [uu, setuu] = useState("sung");
  const [device_ls, setdevice_ls] = useState([]);
  const [user_data, setuser_data] = useState([]);
  let dev_temp = []
  function add_token(){
    Swal.fire({
      title: 'Add device token : ' + token,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const PObject = { device_token: token, p_id: uid}
        axios.post('http://localhost:8082/api/pair/create_pair',PObject).then(res => {
        if(res.data.message == "add device success"){ Swal.fire("add device success", '', 'success')  }
        else{  Swal.fire("this device already pair", '', 'error')   }
      })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }pull_device(); setcc(10);
    })
  }

  function pull_device(){
    axios.get('http://localhost:8082/api/pair/me/'+uid).then(res => {
    for (let  i=0; i<res.data.length; i++){
      dev_temp.push(res.data[i])
    }
    setdevice_ls(dev_temp);
    const dd = cc; setcc(dd-1) 
  })
  }
  
  function remove_token(pp){
    Swal.fire({
      title: 'remove device token : ' + pp,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const PObject = { device_token: pp, p_id: uid}
        axios.post('http://localhost:8082/api/pair/delete_pair',PObject).then(res => {
        if(res.data.message == "remove successfully"){ 
          pull_device()
          Swal.fire("remove successfully", '', 'success')  }}
      )} else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      } pull_device(); setcc(10);
  })
  }
  
  useEffect(() => {
  if(cc>0){ pull_device(); 
  axios.get('http://localhost:8082/api/patient/info-patient/'+uid).then(res => {
    const t = [(res.data)]
    setuser_data(t)
    try{
      setuu(user_data[0].username)
    }
    catch(err){}
    console.log(user_data[0].username)
  })
  }
  },[cc,device_ls]);

  function print_row(index){
    if (device_ls[index].d_status == "1")
      return ( 
        <CTableRow v-for="item in tableItems" color='success' key={index} >
        <CTableDataCell className="text-center">
        <CloseButton variant='dark'  onClick={() => remove_token(device_ls[index].device_token)}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <div >
            <span>{device_ls[index].device_token}</span>
          </div>
          <div className="small text-medium-emphasis"></div>
        </CTableDataCell>
        <CTableDataCell className="text-center">
        <ChartPulse token={device_ls[index].device_token}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
         <ChartPressure token={device_ls[index].device_token}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <ChartOxi token={device_ls[index].device_token}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <CheckStatus token={device_ls[index].device_token}/>
        </CTableDataCell>
      </CTableRow>
        )
    else {
      return (
        <CTableRow v-for="item in tableItems" key={index} >
        <CTableDataCell className="text-center">
        <CloseButton variant='dark'  onClick={() => remove_token(device_ls[index].device_token)}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <div >
            <span>{device_ls[index].device_token}</span>
          </div>
          <div className="small text-medium-emphasis"></div>
        </CTableDataCell>
        <CTableDataCell className="text-center">
        <ChartPulse token={device_ls[index].device_token}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
         <ChartPressure token={device_ls[index].device_token}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <ChartOxi token={device_ls[index].device_token}/>
        </CTableDataCell>
        <CTableDataCell className="text-center">
          <CheckStatus token={device_ls[index].device_token}/>
        </CTableDataCell>
      </CTableRow>
      )
    }
  }

    return (
      <div>

        <Container className="mb-3 ">
          <div className='w-25 '>
            <Form className="d-flex ">
              <Form.Control
                type="search"
                placeholder="device token"
                className="me-2"
                aria-label="Search"
                onChange={e => settoken(e.target.value)}
              />
              <Button  onClick={add_token} >Add Device  </Button>
            </Form>
            </div>
        </Container>

            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                        #
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Token</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Pulse</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Pressure</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">%Oxi</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {device_ls.map((item, index) => (
                    print_row(index)
                  ))}
                </CTableBody>
              </CTable>
              </div>
         )
}

export default MntTable
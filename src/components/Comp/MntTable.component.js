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
import ChartPulse from './ChartPulse.component';
import ChartPressure from './ChartPressure.component';
import ChartOxi from './ChartOxi.component';
import CheckStatus from './CheckStatus.component';
import axios from 'axios'
import { useCookies,Cookies  } from 'react-cookie';

const tableExample = [
    {
      user: {
        name: 'saitama onepunch',
        uname: "mannn7420",
        age: '25',
      },
    },
  ]

const MntTable = () => {

  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [user_data, setuser_data] = useState([{id:"0",device_token:"0",violen:"0"}]);
  const [mode, setmode] = useState("");
  const [search, setsearch] = useState("");
  const [req_ls, setreq_ls]= useState([]);
  const [cc, setcc] = useState(2);

  useEffect(() => {
    if(cc>0){
      axios.get('http://localhost:8082/api/following/monitor_doctor/'+uid).then(res => {
      setuser_data(res.data)
    })
    const dd = cc 
    setcc(dd-1)
    console.log(cc)
    }
  },[cc]);
  //console.log(user_data[0].device_token)
  console.log(user_data)

  function print_row(index){
    if(user_data[index].violent == "0"){
    return (
      <CTableRow v-for="item in tableItems" key={index} color="Default" >
                      <CTableDataCell className="text-center">
                        {index+1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center c_hover"  onClick={()=>{window.location.assign('info?cid='+user_data[index].p_id)}}>
                        <div>{user_data[index].pat_rname}</div>
                        <div className="small text-medium-emphasis">
                          <span>{user_data[index].pat_uname}</span> | age : {user_data[index].pat_age}
                        </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        <ChartPulse token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                         <ChartPressure token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <ChartOxi token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CheckStatus token={user_data[index].device_token} item={user_data[index]}/>
                        </CTableDataCell>
                    </CTableRow>
    )}
    if(user_data[index].violent == "1"){
      return (
        <CTableRow v-for="item in tableItems" key={index} color="success" >
                        <CTableDataCell className="text-center">
                          {index+1}
                        </CTableDataCell>
                        <CTableDataCell className="text-center c_hover" onClick={()=>{window.location.assign('info?cid='+user_data[index].p_id)}}>
                          <div>{user_data[index].pat_rname}</div>
                          <div className="small text-medium-emphasis">
                            <span>{user_data[index].pat_uname}</span> | age : {user_data[index].pat_age}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                        <ChartPulse token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                         <ChartPressure token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <ChartOxi token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CheckStatus token={user_data[index].device_token} item={user_data[index]}/>
                        </CTableDataCell>
                      </CTableRow>
      )}
      if(user_data[index].violent == "2"){
        return (
          <CTableRow v-for="item in tableItems" key={index} color="danger" >
                          <CTableDataCell className="text-center">
                            {index+1}
                          </CTableDataCell>
                          <CTableDataCell className="text-center c_hover" onClick={()=>{window.location.assign('info?cid='+user_data[index].p_id)}}>
                            <div>{user_data[index].pat_rname}</div>
                            <div className="small text-medium-emphasis">
                              <span>{user_data[index].pat_uname}</span> | age : {user_data[index].pat_age}
                            </div>
                            </CTableDataCell>
                        <CTableDataCell className="text-center">
                        <ChartPulse token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                         <ChartPressure token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <ChartOxi token={user_data[index].device_token}/>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CheckStatus token={user_data[index].device_token} item={user_data[index]}/>
                        </CTableDataCell>
                        </CTableRow>
        )}
  }
    return (
            <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                        #
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Patient</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Pulse</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Pressure</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">SpO2</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {user_data.map((item, index) => (

                      print_row(index)
    
                  ))}
                </CTableBody>
              </CTable>
         )
}

export default MntTable

/*
<CTableRow v-for="item in tableItems" key={index} >
                      <CTableDataCell className="text-center">
                        {index+1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{user_data[index].pat_rname}</div>
                        <div className="small text-medium-emphasis">
                          <span>{user_data[index].pat_uname}</span> | age : {user_data[index].pat_age}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                      <ChartPulse name={"sass "}/>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                       <ChartPressure /> 
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <ChartOxi />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CheckStatus />
                      </CTableDataCell>
                    </CTableRow>
*/
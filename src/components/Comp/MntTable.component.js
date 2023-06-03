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
import ChartPulse from './ChartPulse.component';
import ChartPressure from './ChartPressure.component';
import ChartOxi from './ChartOxi.component';
import CheckStatus from './CheckStatus.component';
import axios from 'axios'
import { useCookies,Cookies  } from 'react-cookie';

const MntTable = () => {
  const current_url = new URL(window.location.href)
  const search_params = current_url.searchParams;
  let see = search_params.get('see');
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [user_data, setuser_data] = useState([{id:"0",device_token:"0",violen:"0"}]);
  const [mode, setmode] = useState("");
  const [search, setsearch] = useState("");
  const [req_ls, setreq_ls]= useState([]);
  const [cc, setcc] = useState(2);
  const [fil1, setfil1] = useState("0");
  const [fil2, setfil2] = useState("0");
  const [fil3, setfil3] = useState("Dsc");
  let ff = [];
  if(see == "" || see == null){see = "all"}
  useEffect(() => {
    if(cc>0){
      
      console.log(see + "sssa a")
      axios.get('http://localhost:8082/api/following/monitor_doctor/'+uid).then(res => {
      ff = res.data
      if(fil3 == "Dsc"){
        if(fil2 == "Critical")
        ff.sort(function(a, b) {
          return b.violent  - a.violent;
        });
        if(fil2 == "Age")
        ff.sort(function(a, b) {
          return b.pat_age - a.pat_age;
        });
        if(fil2 == "Weight")
        ff.sort(function(a, b) {
          return b.pat_kgcm - a.pat_kgcm;
        });
        if(fil2 == "Old-New")
        ff.sort(function(a, b) {
          return b - a;
        });

        if(fil1 == "Critical")
        ff.sort(function(a, b) {
          return b.violent  - a.violent;
        });
        if(fil1 == "Age")
        ff.sort(function(a, b) {
          return b.pat_age - a.pat_age;
        });
        if(fil1 == "Weight")
        ff.sort(function(a, b) {
          return b.pat_kgcm - a.pat_kgcm;
        });
        if(fil1 == "Old-New")
        ff.sort(function(a, b) {
          return b - a;
        });
      }
      if(fil3 == "Asc"){
        if(fil2 == "Critical")
        ff.sort(function(a, b) {
          return a.violent  - b.violent;
        });
        if(fil2 == "Age")
        ff.sort(function(a, b) {
          return a.pat_age - b.pat_age;
        });
        if(fil2 == "Weight")
        ff.sort(function(a, b) {
          return a.pat_kgcm - b.pat_kgcm;
        });
        if(fil2 == "Old-New")
        ff.sort(function(a, b) {
          return a - b;
        });

        if(fil1 == "Critical")
        ff.sort(function(a, b) {
          return a.violent  - b.violent;
        });
        if(fil1 == "Age")
        ff.sort(function(a, b) {
          return a.pat_age - b.pat_age;
        });
        if(fil1 == "Weight")
        ff.sort(function(a, b) {
          return a.pat_kgcm - b.pat_kgcm;
        });
        if(fil1 == "Old-New")
        ff.sort(function(a, b) {
          return a - b;
        });
      }
      console.log(ff)
      setuser_data(ff)
    })
    const dd = cc 
    setcc(dd-1)
    console.log(cc)
    }
  },[cc]);
  //console.log(user_data[0].device_token)
  //console.log(user_data)

  function print_row(index){
    
    if((user_data[index].violent == "0" && see == "all")  || (user_data[index].violent == "0" && see == "new")){
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
                          <CheckStatus token={user_data[index].device_token} ind={index} item={user_data[index]}/>
                        </CTableDataCell>
                    </CTableRow>
    )}
    if((user_data[index].violent == "1" && see == "all")  || (user_data[index].violent == "1" && see == "nor")){
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
                          <CheckStatus token={user_data[index].device_token} ind={index} item={user_data[index]}/>
                        </CTableDataCell>
                      </CTableRow>
      )}
      if((user_data[index].violent == "2" && see == "all")  || (user_data[index].violent == "2" && see == "care")){
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
                          <CheckStatus token={user_data[index].device_token} ind={index} item={user_data[index]}/>
                        </CTableDataCell>
                        </CTableRow>
        )}
  }

  function my_setfil1(e){
    setfil1(e.target.value)
    setcc(1)
  }
  function my_setfil2(e){
    setfil2(e.target.value)
    setcc(1)
  }
  function my_setfil3(e){
    setfil3(e.target.value)
    setcc(1)
  }
    return (
      <div>
      <div class="d-flex justify-content-center mb-4 "> 
      <select class="form-select mx-3"  aria-label="Default select example" title="Choose Option" onChange={(e) => my_setfil1(e)}>
                    <option value="0">Filter1 </option>
                    <option value="Critical">Critical</option>
                    <option value="Age">Age</option>
                    <option value="Weight">Weight</option>
                    <option value="Old-New">Old-New</option>
                  </select>
      <select class="form-select mx-3"  aria-label="Default select example" title="Choose Option" onChange={(e) => my_setfil2(e)}>
                    <option value="0" >Filter2 </option>
                    <option value="Critical">Critical</option>
                    <option value="Age">Age</option>
                    <option value="Weight">Weight</option>
                    <option value="Old-New">Old-New</option>
                  </select>
      <select  class="form-select mx-3" aria-label="Default select example" title="Choose Option" onChange={(e) => my_setfil3(e)}>
                    <option value="Dsc">Descending</option>
                    <option value="Asc">Ascending</option>
                  </select>
      </div>
      
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
          </div>
         )
}

export default MntTable

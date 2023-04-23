import Modal from 'react-bootstrap/Modal';
import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../index';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useCookies,Cookies  } from 'react-cookie';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Appoint from '../../Comp/Appoint.component';
const url = require('url');
function Info_doctor (){
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [chat_list, setchat_list] = useState([]);
  const [t_list, sett_list] = useState([]);
  const [cc, setcc] = useState(2);
  const [bb, setbb] = useState(2);
  const current_url = new URL(window.location.href)
  const search_params = current_url.searchParams;
  const cid = search_params.get('cid');

  useEffect(() => {
    if(cc>0){
      axios.get('http://localhost:8082/api/patient/info-patient/'+cid).then(res => {
      setchat_list(res.data)
      let list_h2 = [res.data.detail[0].name_sur,res.data.tel,res.data.address,res.data.detail[0].gender,res.data.detail[0].blood_group,
      res.data.detail[0].age,res.data.detail[0].kg_cm,res.data.detail[0].drug,res.data.detail[0].allergy,res.data.detail[0].chronic_disease,res.data.detail[0].description]
      sett_list(list_h2)
      setbb(3)
    })
    const dd = cc 
    setcc(dd-1)
    }
  },[cc,chat_list]);
    console.log(chat_list)
    console.log(chat_list)
    console.log(chat_list)
    console.log(chat_list)

  function row_info(){
      let list_h1 = ["ชื่อ-นามสกุล","เบอร์โทร","ที่อยู่","เพศ","กรุ๊ปเลือด","อายุ","น้ำหนัก/ส่วนสูง(kg/cm)","แพ้ยา","อาการแพ้","โรคประจำตัว","หมายเหตุเพิ่มเติม"]
      return (
        <MDBTableBody >
        {t_list.map((item, index) => (
          <tr>
        <td>
          <p className='fw-normal mb-1'>{list_h1[index]}</p>
        </td>
        <td>
        <p className='fw-normal mb-1'>{item}</p>
          </td>
        </tr>
        ))}
        </MDBTableBody>
      )
       
    }
    return (
      <div className="gg">
      <AppSidebar />
      <div className="wrapper d-flex flex-column bg-light " >
        <AppHeader />
        <div className="body flex-grow-1 px-5">
            
            <h2 className='text-center mb-4'>Info </h2> 
            <div className='d-flex justify-content-end'>
            <MDBBtn rounded className='mx-2 px-5' color='success' onClick={()=>{window.location.assign('chat?cid='+chat_list._id)}} >
              Chat
            </MDBBtn>
            <Appoint className="float-right" />
            </div>
      <MDBTable align='center' striped hover bordered className="my-5">
      {row_info()}
      </MDBTable>
    
            </div>
        <AppFooter />
      </div>
    </div>
         )
}

export default Info_doctor



/**
 <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
 */
/*
 
      
*/
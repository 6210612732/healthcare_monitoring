 import React from 'react'
import { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { useCookies,Cookies  } from 'react-cookie';
import axios from 'axios';

const DashSum = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
  const cookies = new Cookies();
  const uid = cookies.get('id')
  const [user_data, setuser_data] = useState([]);
  const [sum_static, setsum_static] = useState([]);

  function count_sum(item){
    let all = item.length; let careful = 0; let normal = 0;
    for(let i = 0;i<item.length;i++){
      if(item[i].violent == 1) normal++
      else if(item[i].violent == 2) careful++
    }
    setsum_static({all:all, normal:normal, careful:careful, unrank:(all-normal-careful)})
  }

  useEffect(() => {
     axios.get('http://localhost:8082/api/following/monitor_doctor/'+uid).then(res => {
      setuser_data(res.data)
      count_sum(res.data)
    })

  }, []); // <- add the count variable here

  function doThis(aa){
    if(aa==1){
      window.location.assign("dashboard?see=all")
    }
    if(aa==2){
      window.location.assign("dashboard?see=care")
    }
    if(aa==3){
      window.location.assign("dashboard?see=nor")
    }
    if(aa==4){
      window.location.assign("dashboard?see=new")
    }
  }

  return (
    <CRow>
      <CCol sm={6} lg={3} >
      <div onClick={ () => doThis(1)}>
        <CWidgetStatsA  
          className="mb-4"
          color="primary"
          value={
            <>
            <div className='pb-3' onClick={ () => doThis()}>
              All{' '}
              <span className="fs-6 fw-normal">
                ({sum_static.all})
              </span>
              <br></br>
              </div>
            </>
          }
        />
        </div>
      </CCol>
      <CCol sm={6} lg={3} >
      <div onClick={ () => doThis(2)}>
        <CWidgetStatsA
          className="mb-4"
          color="danger"
          value={
            <>
            <div className='pb-3' >
            Careful{' '}
              <span className="fs-6 fw-normal">
                ({sum_static.careful})
              </span>
              <br></br>
              </div>
            </>
          }
        />
        </div>
      </CCol>
      <CCol sm={6} lg={3} >
      <div onClick={ () => doThis(3)}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
            <div className='pb-3' >
              Normal{' '}
              <span className="fs-6 fw-normal">
                ({sum_static.normal})
              </span>
              <br></br>
              </div>
            </>
          }
        />
        </div>
      </CCol>
      
      <CCol sm={6} lg={3} >
      <div onClick={ () => doThis(4)}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
            <div className='pb-3' >
            New{' '}
              <span className="fs-6 fw-normal">
                ({sum_static.unrank})
              </span>
              <br></br>
              </div>
            </>
          }
        />
        </div>
      </CCol>
      </CRow>
  )
}

export default DashSum
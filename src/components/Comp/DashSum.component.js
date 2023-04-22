import React from 'react'
import { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'

const DashSum = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  function doThis(aa){
    console.log("aaaaaaaaaaaa" + aa)
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
                (count)
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
                (count)
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
                (count)
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
            Unsort{' '}
              <span className="fs-6 fw-normal">
                (count)
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
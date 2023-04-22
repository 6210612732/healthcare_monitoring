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
                  {tableExample.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index} >
                      <CTableDataCell className="text-center">
                        {index+1}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.uname}</span> | age : {item.user.age}
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
                  ))}
                </CTableBody>
              </CTable>
         )
}

export default MntTable
import React from 'react'
import { AppContent, AppSidebar_p, AppFooter, AppHeader } from '../../index';
import DashSum from '../../Comp/DashSum.component';
import MntTable2 from '../../Comp/MntTable2.component';

const Dashboard_patient = () => {
  
  return (
    <div className="gg">
      <AppSidebar_p />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light ">
        <AppHeader />
        <div className="body flex-grow-1 px-5">

          <MntTable2 />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Dashboard_patient

import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../index';
import DashSum from '../../Comp/DashSum.component';
import MntTable from '../../Comp/MntTable.component';

const Dashboard_doctor = () => {
  
  return (
    <div className="gg">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light ">
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <DashSum />
          <MntTable />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Dashboard_doctor

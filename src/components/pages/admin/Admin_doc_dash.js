import React from 'react'
import { AppContent, AppSidebar_a, AppFooter, AppHeader } from '../../index';
import DashSum_2 from '../../Comp/DashSum_2.component';
import MntTable_2 from '../../Comp/MntTable_2.component';

const Admin_doc_dash = (  ) => {
  
  return (
    <div className="gg">
     <AppSidebar_a />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light ">
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <DashSum_2 />
          <MntTable_2 />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Admin_doc_dash

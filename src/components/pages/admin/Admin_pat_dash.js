import React from 'react'
import { AppContent, AppSidebar_a, AppFooter, AppHeader } from '../../index';
import MntTable2_2 from '../../Comp/MntTable2_2.component';

const Admin_pat_dash = (  ) => {
  
  return (
    <div className="gg">
     <AppSidebar_a />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light ">
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <MntTable2_2 />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Admin_pat_dash

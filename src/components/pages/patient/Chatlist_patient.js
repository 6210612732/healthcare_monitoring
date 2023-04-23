import React from 'react'
import { AppContent, AppSidebar_p, AppFooter, AppHeader } from '../../index';
import ChatMessage_p from '../../Comp/ChatMessage_p.component';

const Dashboard_doctor = () => {
  
  return (
    <div className="gg">
      <AppSidebar_p />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light " >
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <ChatMessage_p/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Dashboard_doctor

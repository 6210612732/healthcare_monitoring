import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../index';
import ChatRoom from '../../Comp/ChatRoom.component';

const Chat_doctor = () => {
  
  return (
    <div className="gg">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light " >
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <ChatRoom />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Chat_doctor

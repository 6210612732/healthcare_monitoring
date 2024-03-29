import React from 'react'
import { AppContent, AppSidebar_p, AppFooter, AppHeader } from '../../index';
import ChatRoom_p from '../../Comp/ChatRoom_p.component';

const Chat_patient = ({socket}) => {
  
  return (
    <div className="gg">
      <AppSidebar_p />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light " >
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <ChatRoom_p socket={socket}/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Chat_patient

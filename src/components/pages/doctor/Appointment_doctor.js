import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../index';
import Calendar_doc from '../../Comp/Calendar_doc.component';

const Appointment_doctor = () => {
  
  return (
    <div className="gg">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light " >
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <Calendar_doc />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Appointment_doctor

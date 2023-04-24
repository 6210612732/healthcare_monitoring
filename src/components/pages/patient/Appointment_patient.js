import React from 'react'
import { AppContent, AppSidebar_p, AppFooter, AppHeader } from '../../index';
import Calendar_p from '../../Comp/Calendar_p.component';

const Appointment_patient = () => {
  
  return (
    <div className="gg">
      <AppSidebar_p />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light " >
        <AppHeader />
        <div className="body flex-grow-1 px-5">
          <Calendar_p />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Appointment_patient

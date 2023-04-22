import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople,
  cilListRich,
  cilChatBubble,
  cilSpeedometer,
  cilInfo,
  cilAccountLogout,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav_p = [
  {
    component: CNavTitle,
    name: 'Patient',
  },
  {
    component: CNavItem,
    name: 'Device',
    to: '/patient/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Feature',
  },
  {
    component: CNavItem,
    name: 'Search',
    to: '/doctor/search',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Chat',
    to: '/doctor/chat',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Appointment',
    to: '/doctor/appointment',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Account',
  },
  {
    component: CNavItem,
    name: 'Info',
    to: '/doctor/info',
    icon: <CIcon icon={cilInfo} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav_p

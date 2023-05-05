import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilVoiceOverRecord,
  cilUser,
  cilChatBubble,
  cilSpeedometer,
  cilInfo,
  cilAccountLogout,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Manage',
  },
  {
    component: CNavItem,
    name: 'Doctor',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilVoiceOverRecord} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Patient',
    to: '/admin/dashboard2',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Account',
  },

  {
    component: CNavItem,
    name: 'Logout',
    to: '/logout',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon" />,
  },
]

export default _nav

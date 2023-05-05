import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from './_nav_a'

const AppSidebar = () => {
  const logo = 'src/assets/pic/logo.jpg'

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand style={{ background: "#0A4D68"}} className="d-none d-md-flex" to="/">
        <img className="sidebar-brand-full" src={require ("../assets/pic/logo_r2.png")} height={130} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav style={{ background: "#088395"}} >
        <SimpleBar >
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav >
      
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (
  <>
    <SideBar/>
    <Outlet /> 
  </>
  )
}

export default Admin

import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Admin_view/Header'
import Sider from '../component/Admin_view/Sider'
import Layer from '../component/Admin_view/Layer'
import '../page/PageCss/adminlayer.css'

const AdminLayer = () => {
  return (
    <div className='top' >
    

      <Header/>
     
      <div className='adminLayer'>
      <Sider />
      <Layer/>
      </div>
      <Outlet/>
    </div>
  )
}

export default AdminLayer
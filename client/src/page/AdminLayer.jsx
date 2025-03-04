import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Admin_view/Header'
import '../page/PageCss/adminlayer.css'

const AdminLayer = () => {
  return (
    <div className='top' >
      <Header/>
     
      <div className='adminLayer'>
   
      </div>
      <Outlet/>
    </div>
  )
}

export default AdminLayer
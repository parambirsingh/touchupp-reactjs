import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../common/header'
import Footer from '../common/footer'

function Layout() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout
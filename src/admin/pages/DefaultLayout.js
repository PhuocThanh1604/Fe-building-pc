import React, { useEffect, useState } from 'react'
import { Outlet, redirect } from 'react-router'
import instance from 'src/axios'
import { AppContent, AppFooter, AppHeader, AppSidebar, ImageUpload } from 'src/admin/components'
import { Notifications } from 'react-push-notification'
import addNotification from 'react-push-notification'
import 'antd/dist/reset.css';

const DefaultLayout = () => {
  return (
    <>
          <AppContent />
          </>  
  )
}

export default DefaultLayout

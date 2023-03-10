import React, { useEffect, useState } from 'react'
import { Outlet, redirect } from 'react-router'
import instance from 'src/axios'
import { AppContent, AppFooter, AppHeader, AppSidebar, ImageUpload } from 'src/admin/components'
import { Notifications } from 'react-push-notification'
import addNotification from 'react-push-notification'
import 'antd/dist/reset.css';
import SideMenu from '../components/SideMenu'
import PageContent from '../components/PageContent'
const DefaultLayout = () => {
  // const [loading, setLoading] = useState(true)
  // const [premission, setPremisstion] = useState(false)
  // let redirect = redirect()
  // useEffect(() => {
  //   // get jwt from localstorge
  //   let jwt = sessionStorage.getItem('jwt')

  //   // axios.post(url, {data: jwt}). then (
  //   instance.get('url', { headers: { Authorization: jwt } }).then((res) => {
  //     //  rule
  //     // rule != admin ? (2redirect to login page,1 clean localstorge) :
  //     //)
  //     if (res.status === 200) {
  //       localStorage.removeItem(jwt)
  //       if (res.data.roles[0].name !== 'admin') {
  //         redirect('/dashboard#/dashbroad', { replace: true })
  //       } else {
  //         loading(false)
  //         setPremisstion(true)
  //       }
  //     } else {
  //       redirect('/dashboard#/dashbroad', { replace: true })
  //     }
  //   })
  // }, [setPremisstion])

  return (
    <>
          <AppContent />
          </>  
  )
}

export default DefaultLayout

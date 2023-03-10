import React, { Suspense, useEffect, useState } from 'react'
import { async, BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import Product from './admin/pages/Product'
import { AppFooter, AppHeader, AppSidebar, ImageUpload } from './admin/components'
import Category from './admin/pages/Category'
import AppComponent from './admin/pages/AddComponent'
import { AuthContextProvider } from './api/AuthContext'
import { Navbar } from 'react-bootstrap'
import Protected from './admin/components/Protected'
import Account from './admin/pages/Account'
import Home from './admin/components/Home'
import DefaultLayout from "./admin/pages/DefaultLayout";
import Orders from "./admin/pages/Orders";
import Login from "./admin/pages/Login";
import Register from "./admin/pages/Register";
import Page404 from "./admin/pages/Page404";
import Page500 from "./admin/pages/Page500";
import Customers from "./admin/pages/Customers";

// import Dashboard from './views/dashboard/Dashboard'

// Configure Firebase.
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE_API,
//   authDomain: process.env.REACT_APP_FIRSEBASE_AUTH_DOMAIN,
// }
// firebase.initializeApp(config)

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
// const DefaultLayout = React.lazy(() => import('./admin/pages/DefaultLayout'))
// const Orders = React.lazy(() => import('./admin/pages/Orders'))
// Pages
// const Login = React.lazy(() => import('./admin/pages/Login'))
// const Register = React.lazy(() => import('./admin/pages/Register'))
// const Page404 = React.lazy(() => import('./admin/pages/Page404'))
// const Page500 = React.lazy(() => import('./admin/pages/Page500'))
// const Customers = React.lazy(() => import('./admin/pages/Customers'))
function App() {
  // useEffect(() => {
  //   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
  //     if (!user) {
  //       //user logsout ,hanld somethin here
  //       console.log('use is not logged in')
  //       return
  //       // Authentication //xem user login hay chua
  //       // authorlization // phan quyen // jwt
  //     }
  //     console.log('Logged in user', user.displayName)
  //     const token = await user.getIdToken()
  //     console.log('Logged in user token', token)
  //   })
  //   // this.setState({ isSingedIn: !!user }))
  //   return () => unregisterAuthObserver() // Make sure we un-register Firebase observers when the component unmounts.
  // }, [])
  return (
    <AuthContextProvider>
      <BrowserRouter>
        {/* <Navbar /> */}
        {/* <Route path="/" >
          <Route exact path='' element={<Home/>} />
          <Route exact path='login' element={<Login/>} />
         </Route>
      </Routes> */}

      {/*Tét layout*/}

        <Routes>
        <Route exact path='' element={<Home/>} />
          <Route exact path='login' element={<Login/>} />
          <Route
            path='/account'
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
                    <Route path="/dashbroad" name="Dashbroad"  element={<Protected><DefaultLayout /></Protected>} />

           <Route path="/product" element={<Protected><Product /></Protected>} />
          <Route path="/categories" element={<Protected><Category /></Protected>} />
          <Route path="/component/add" element={<Protected><AppComponent /></Protected>} />
          <Route path="/order" element={<Protected><Orders /></Protected>} />
          <Route path="/customer" element={<Protected><Customers /></Protected>} />
          <Route path="/upload" element={<Protected><ImageUpload /></Protected>} />
           <Route path="/register" name="Register Page" element={<Protected><Register /></Protected>} />
           <Route path="/404" name="Page 404" element={<Protected><Page404 /></Protected>} />
           <Route path="/500" name="Page 500" element={<Protected><Page500 /></Protected>} />


        <Route path='/orders' element={<Orders/>}></Route>

        {/* <Route path='/categories' element={<Category/>}></Route>

        <Route path='/customers' element={<Customers/>}></Route> */}
        </Routes>


        </BrowserRouter>
      </AuthContextProvider>
    // <BrowserRouter>
      // <Suspense fallback={loading}>
      //   <Routes>
      //     <Route path="/" name="Login Page" element={<Login />} />
      //   </Routes>
      //   <Routes>

      //   </Routes>
      // </Suspense>
    // </BrowserRouter>
  )
}

export default App

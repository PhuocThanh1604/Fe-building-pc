import React, { Suspense, useEffect, useState } from 'react'
import { async, BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import Product from './admin/pages/AddProduct'
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
import Orderdetail from "./admin/pages/Orderdetail";
import Login from "./admin/pages/Login";
import Register from "./admin/pages/Register";
import Page404 from "./admin/pages/Page404";
import Page500 from "./admin/pages/Page500";
import Customers from "./admin/pages/Customers";
import AddProduct from './admin/pages/AddProduct'
import ProductDetail from './admin/pages/ProductOrdertail'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='' element={<Home/>} />
          <Route exact path='login' element={<Login/>} />
          <Route path='/account'element={<Protected><Account /></Protected>}/>
          <Route path="/dashbroad" name="Dashbroad"  element={<Protected><DefaultLayout /></Protected>} />
          <Route path="/product" element={<Protected><AddProduct /></Protected>} />
          <Route path="/productDetail" element={<Protected><ProductDetail /></Protected>} />
          <Route path="/categories" element={<Protected><Category /></Protected>} />
          <Route path="/component/add" element={<Protected><AppComponent /></Protected>} />
          <Route path="/order" element={<Protected><Orders /></Protected>} />
          <Route path="/orderdetail" element={<Protected><Orderdetail /></Protected>} />
          <Route path="/customer" element={<Protected><Customers /></Protected>} />
          <Route path="/upload" element={<Protected><ImageUpload /></Protected>} />
          <Route path="/register" name="Register Page" element={<Protected><Register /></Protected>} />
          <Route path="/404" name="Page 404" element={<Protected><Page404 /></Protected>} />
          <Route path="/500" name="Page 500" element={<Protected><Page500 /></Protected>} />
          <Route path='/orders' element={<Protected><Orders/></Protected>}></Route>
        </Routes>
        </BrowserRouter>
      </AuthContextProvider>

  )
}

export default App

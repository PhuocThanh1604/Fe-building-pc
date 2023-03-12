import React from 'react'

import 'simplebar/dist/simplebar.min.css'
import './_navsidebar.scss'
// sidebar nav config
import { FaBars, FaShoppingBag, FaUser, FaCarBattery, FaUpload } from 'react-icons/fa'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'



function AppSidebar () {
  const sidebarNavItems = [
    {
      display: "Dashboard",
      icon: <FaBars />,
      to: "/dashbroad",
      section: "/dashbroad",
    },
    {
      display: "Category",
      icon: <FaCarBattery />,
      to: "/categories",
      section: "/categories",
    },
    {
      display: "Product",
      icon: <FaShoppingBag />,
      to: "/product",
      section: "product",
    },
    {
      display: "User",
      icon: <FaUser />,
      to: "/customer",
      section: "customer",
    },
    {
      display: "Orders",
      icon: <FaShoppingBag />,
      to: "/order",
      section: "order",
    },{
      display: "OrderDetail",
      icon: <FaShoppingBag />,
      to: "/orderdetail",
      section: "orderdetail",
    },
    {
      display: "ImageUpload",
      icon: <FaUpload />,
      to: "/upload",
      section: "upload",
    },
    {
      display: "Component",
      icon: <FaUpload />,
      to: "/component/add",
      section: "component",
    },
  ];
  // const [activeIndex, setActiveIndex] = useState(0)
  // const [stepHeight, setStepHeight] = useState(0)
  const sidebarRef = useRef()
  const indicatorRef = useRef()
  const location = useLocation()
  const isActive = (path) => {
    if (window.location.pathname === path) return "active";
    else return "";
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item')
  //     indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`
  //     setStepHeight(sidebarItem.clientHeight)
  //   }, 50)
  // }, [])

  // change active index
  // useEffect(() => {
  //   const curPath = window.location.pathname.split('/')[1]
  //   const activeItem = sidebarNavItems.findIndex((item) => {
  //     return item.section === curPath
  //   })
  //   setActiveIndex(curPath.length === 0 ? 0 : activeItem)
  // }, [location])
  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <h1>Admin Build PC</h1>
      </div>
      <div className="sidebar__menu">
        {/* <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        ></div> */}
        {sidebarNavItems.map((item, index) => (
          <Link to={item.to} key={index}>
            <div className={`sidebar__menu__item ${isActive(item.to)}`}>
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default React.memo(AppSidebar)

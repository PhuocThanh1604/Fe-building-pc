import React, { useState } from "react";
import { Link } from "react-router-dom";

const SubMenu = ({ item, isActive }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link to={item.to} onClick={item.subNav && showSubnav}>
        <div className={`sidebar__menu__item ${isActive(item.to)}`}>
          <div className="sidebar__menu__item__icon">{item.icon}</div>
          <div className="sidebar__menu__item__text">{item.display}</div>
        </div>
      </Link>
      {subnav &&
        item.subNav.map((item, index) => (
          <Link to={item.to} key={index}>
            <div
              className={`sidebar__menu__item ${isActive(item.to)}`}
              style={{ paddingLeft: "68px" }}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
    </>
  );
};

export default SubMenu;

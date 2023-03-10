import { ApartmentOutlined, CloudUploadOutlined, ShopOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function SideMenu(){

    const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

    const navigate = useNavigate();
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashbroad",
              icon: <ApartmentOutlined />,
              key: "/dashbroad",
            },
            {
              label: "Inventory",
              icon: <ShopOutlined />,
              key: "/dashbroad/inventory",
            },
            {
              label: "Orders",
              icon: <ShoppingCartOutlined />,
              key: "/dashbroad/orders",
            },
            {
              label: "Categories",
              icon: <ShoppingCartOutlined />,
              key: "/dashbroad/categories",
            },
            {
              label: "Products",
              icon: <ShoppingCartOutlined />,
              key: "/dashbroad/products",
            },
            {
              label: "Customers",
              icon: <UserOutlined />,
              key: "/dashbroad/customers",
            },
            {
              label: "UploadFile",
              icon: <CloudUploadOutlined />,
              key: "/dashbroad/uploadfile",
            }
          ]}
        ></Menu>
      </div>
    );
    }

    export default SideMenu

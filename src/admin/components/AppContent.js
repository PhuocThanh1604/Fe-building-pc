import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import { Button, Row, Col, Toast } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// routes config
import { getToken } from 'firebase/messaging'
import { UserAuth } from 'src/api/AuthContext'
import {
  getCustomers,
  getInventory,
  getOrders,
  getRevenue,
} from "./../../api/index";
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar } from "react-chartjs-2";

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} style={{fontSize: "25px",fontWeight: "700"}}/>
      </Space>
    </Card>
  );
}
function RecentOrders() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res.products.splice(0, 3));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Typography.Text>Recent Orders</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            dataIndex: "discountedPrice",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardChart() {
  const [reveneuData, setReveneuData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getRevenue().then((res) => {
      const labels = res.carts.map((cart) => {
        return `User-${cart.userId}`;
      });
      const data = res.carts.map((cart) => {
        return cart.discountedTotal;
      });

      const dataSource = {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
          },
        ],
      };

      setReveneuData(dataSource);
    });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={reveneuData} />
    </Card>
  );
}
const AppContent = () => {
  const { logOut, user } = UserAuth()
  const navigate = useNavigate()
  const handleSignOut = async () => {
    try {
      await logOut()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const [show, setShow] = useState(false)
  const [isTokenFound, setTokenFound] = useState(false)
  getToken(setTokenFound)

      const [orders, setOrders] = useState(0);
      const [inventory, setInventory] = useState(0);
      const [customers, setCustomers] = useState(0);
      const [revenue, setRevenue] = useState(0);

      useEffect(() => {
        getOrders().then((res) => {
          setOrders(res.total);
          setRevenue(res.discountedTotal);
        });
        getInventory().then((res) => {
          setInventory(res.total);
        });
        getCustomers().then((res) => {
          setCustomers(res.total);
        });
      }, []);


  return (
    <div className="App">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">Notification</strong>
          <small>12 mins ago</small>
        </Toast.Header>
        <Toast.Body>There are some new updates that you might love!</Toast.Body>
      </Toast>

      <div>
        <p>Welcome admin, {user?.displayName}</p>
      </div>
      <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
        Logout
      </button>
      <Space
        size={20}
        direction="vertical"
        style={{ width: "100%", marginTop: "15px" }}
      >
        {/* <Typography.Title level={4}>Dashboard</Typography.Title> */}
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "space-evenly" }}
        >
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 80,
                  padding: 8,
                }}
              />
            }
            title={"Orders"}
            value={orders}
            style={{ width: "200px" }}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 80,
                  padding: 8,
                }}
              />
            }
            title={"Inventory"}
            value={inventory}
            style={{ width: "200px" }}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 80,
                  padding: 8,
                }}
              />
            }
            title={"Customer"}
            value={customers}
            style={{ width: "200px" }}
          />
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 80,
                  padding: 8,
                }}
              />
            }
            title={"Revenue"}
            value={revenue}
            style={{ width: "200px" }}
          />
        </Space>
        <Space style={{ width: "100%", justifyContent: "space-evenly" }}>
          <RecentOrders />
          <DashboardChart />
        </Space>
      </Space>
    </div>
  );
}

export default React.memo(AppContent)

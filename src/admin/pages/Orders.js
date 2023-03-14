import { Avatar, Image, Rate, Space, Table, Typography } from "antd"
import { useEffect, useState } from "react"
import { UserAuth } from "src/api/AuthContext";

function Orders() {
    // const { user } = UserAuth();
  const getOrders = () => {
    return fetch("https://server-buildingpc.herokuapp.com/bill/getBill?userID=PhuongThai").then((res) => res.json());
  };

  var x = 1000;
x = x.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
console.log(x);
    const[loading,setLoading] = useState(false);
    const[dataSource,setDataSource] = useState([])
    useEffect(()=>{
        setLoading(true)
        getOrders().then(res=>{
            setDataSource(res.billDetail)
            setLoading(false)
        })
    },[])
    return (
      <Space size={20} direction="vertical" style={{ width: "100%" }}>
        <Typography.Title level={4}> Orders</Typography.Title>
        <Table
          loading={loading}
          columns={[
            {
              title: "BillID",
              dataIndex: "billID",
              render: (value) => <span>{value}</span>,
            },
            {
              title: "Total",
              dataIndex: "total",
              render: (value) => <span>{value}đ</span>,
            },

            {
              title: "Amount",
              dataIndex: "amount",
            },
            {
              title: "Status",
              dataIndex: "status",
            },
            {
              title: "Date",
              dataIndex: "payDate",
              render: (date) => (
                <span>
                  {date}
                </span>
              ),
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 6,
          }}
        ></Table>
      </Space>
    );



}

export default Orders

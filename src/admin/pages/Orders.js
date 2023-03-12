import { Avatar, Image, Rate, Space, Table, Typography } from "antd"
import { useEffect, useState } from "react"

function Orders() {
  const getOrders = () => {
    return fetch("https://server-buildingpc.herokuapp.com/cart/getcart?userID=PhuongThai").then((res) => res.json());
  };

  var x = 1000;
x = x.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
console.log(x);
    const[loading,setLoading] = useState(false);
    const[dataSource,setDataSource] = useState([])
    useEffect(()=>{
        setLoading(true)
        getOrders().then(res=>{
            setDataSource(res.Product)
            setLoading(false)
        })
    },[])
    return (
        <Space size={20} direction="vertical" style={{width: "100%"}}>
            <Typography.Title level={4}> Orders</Typography.Title>
            <Table
            loading={loading}
             columns={[
           
                {
                title:"Name",
                dataIndex:"name",
            },
            {

                title:"Price",
                dataIndex:"price",
                render:(value)=><span>{value}đ</span>
            },
      
            {
              title: "Amount",
              dataIndex: "amount",
            },
            {
              title: "Total",
              dataIndex: "totally",
            },
            {
              title:"Photo",
              dataIndex:"image",
              render:(link) =>{
                  return <Avatar src={link}/>
              }
          },

            ]}
            dataSource={dataSource}
            pagination={{
                pageSize:6,
            }}

            >
            </Table>
        </Space>
    )



}

export default Orders

import { Avatar, Image, Rate, Space, Table, Typography } from "antd"
import { useEffect, useState } from "react"

function Orders() {
  const getOrders = () => {
    return fetch("https://server-buildingpc.herokuapp.com/cart/getcart?userID=PhuongThai").then((res) => res.json());
  };
    const[loading,setLoading] = useState(false);
    const[dataSource,setDataSource] = useState([])
    useEffect(()=>{
        setLoading(true)
        getOrders().then(res=>{
            setDataSource(res.ProductDetail)
            setLoading(false)
        })
    },[])
    return (
        <Space size={20} direction="vertical" style={{width: "100%"}}>
            <Typography.Title level={4}> OrdersDetail</Typography.Title>
            <Table
            loading={loading}
             columns={[
                {title:"ID",
                dataIndex:"componentID",
                },
                {
                title:"Name",
                dataIndex:"componentName",
            },
            {

                title:"Price",
                dataIndex:"price",
                render:(value)=><span>{value}đ</span>
            },
            {
              title: "Description",
              dataIndex: "description",
      
            },
            {
              title: "Amount",
              dataIndex: "amount",
            },
            {
              title: "Brand",
              dataIndex: "brand",
            },
            {
                title: "Category",
                dataIndex: "category",
              },
              {
                title:"Photo",
                dataIndex:"image",
                render:(link) =>{
                    return <Avatar src={link}/>
                }
            }



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

import { Avatar, Image, Rate, Space, Table, Typography } from "antd"
import { useEffect, useState } from "react"


function Orders() {
  
  const getOrders = () => {
    return fetch("https://server-buildingpc.herokuapp.com/bill/getBill?userID=PhuongThai").then((res) => res.json());
  };
    const[loading,setLoading] = useState(false);
    const[dataSource,setDataSource] = useState([])
    const[dataSourceComponentDetail,setDataSourceComponentDetail] = useState([])
    useEffect(()=>{
        setLoading(true)
        getOrders().then(res=>{
          // console.log(res.billDetail.componentDetail)
            setDataSource(res.componentDetail)
            // setDataSourceComponentDetail(res.componentDetail)
            // console.log(res.componentDetail)
            setLoading(false)
        })
    },[])
    
    // console.log(dataSource)
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
              title: "PaymentMethod",
              dataIndex: "paymentMethod",
            },
            {
                title: "total",
                dataIndex: "total",
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

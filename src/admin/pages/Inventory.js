import { Avatar, Image, Rate, Space, Table, Typography } from "antd"
import { useEffect, useState } from "react"
import { getInventory } from "../../API";

function Inventory() {
    const[loading,setLoading] = useState(false);
    const[dataSource,setDataSource] = useState([])
    useEffect(()=>{
        setLoading(true)
        getInventory().then(res=>{
            setDataSource(res.products)
            setLoading(false)
        })
    },[])
    return (
        <Space size={20} direction="vertical"> 
            <Typography.Title level={4}> Inventory</Typography.Title>
            <Table
            loading={loading} 
             columns={[
                 {

                    title:"Thumbnail",
                    dataIndex:"thumbnail",
                    render:(link) =>{
                        return <Avatar src={link}/>
                    }
                },
                {

                title:"Title",
                dataIndex:"title",
            },
            {

                title:"Price",
                dataIndex:"price",
                render:(value)=><span>${value}</span>
            },
            {

                title:"Rating",
                dataIndex:"rating",
                render:(rating) =>{
                    return <Rate value={rating} allowHalf/>
                }
            },
            {

                title:"Stock",
                dataIndex:"stock",
            },
           
            {

                title:"Brand",
                dataIndex:"brand",
            },
            {

                title:"Category",
                dataIndex:"category",
            },
            {

                // title:"Images",
                // dataIndex:"images",
                // render:(link) =>{
                //         return <Image src={link}/>
                //     }
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

export default Inventory
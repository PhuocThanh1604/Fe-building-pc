import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Customers() {
   const getCustomers = () => {
    return fetch("https://server-buildingpc.herokuapp.com/user/getListUserWithRoleUser").then((res) => res.json());
  };
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setLoading(true);
        getCustomers().then(res=>{
            setDataSource(res.profiles)
        
            setLoading(false)
        })
    },[])
    return (
        <Space size={20} direction="vertical" style={{width: "100%"}}>
            <Typography.Title level={4}> Page User</Typography.Title>
            <Table
            loading={loading}
             columns={[

                {
                title:"Photo",
                dataIndex:"image",
                render:(link) =>{
                    return <Avatar src={link}/>
                }
            },
            {
              title: "UserName",
              dataIndex: "userName",
            },
            // {
            //     title: "First Name",
            //     dataIndex: "firstName",
            //   },
            //   {
            //     title: "LastName",
            //     dataIndex: "lastName",
            //   },
            {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Phone",
                dataIndex: "phone",
              },

              // {
              //   title: "address",
              //   dataIndex: "address",
              //   render: (address) => {
              //     return (
              //       <span>
              //         {address.address}, {address.city}
              //       </span>
              //     );
              //   },
              // },

            ]}
            dataSource={dataSource}
            pagination={{
                pageSize:5,
            }}

            >


            </Table>
        </Space>
    )



}

export default Customers

import {
  Avatar,
  Image,
  Rate,
  Space,
  Table,
  Typography,
  Button,
  Modal,
} from "antd";
import { useEffect, useState } from "react"
import { UserAuth } from "src/api/AuthContext";
import AddComponent from './AddComponent';
import { Switch } from 'antd';
function Orders() {
  const onChange = (status) => {
    if(status=='1'){
      console.log(`switch to ${status}`);
    }else {
      console.log(`switch to ${status}`);
    }
  };
  
  const { Title, Paragraph, Text, Link } = Typography;
  const getOrders = () => {
    return fetch("https://server-buildingpc.herokuapp.com/bill/getBill?userID=PhuongThai").then((res) => res.json());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [componentDetail, setComponentDetail] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        {/* <Button type="primary" onClick={showModal}>
          Add component
        </Button> */}
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          width={1000}
        >
        <Typography> <Title>Orders Detail</Title></Typography>
          <Table
          
            loading={loading}
            columns={[
              {
                title: "Photo",
                dataIndex: "image",
                render: (link) => {
                  return <Avatar src={link} />;
                },
              },
              {
                title: "Component Name",
                dataIndex: "componentName",
              },
              {
                title: "Category",
                dataIndex: "category",
              },
              {
                title: "Amount",
                dataIndex: "amount",
              },
              {
                title: "Price",
                dataIndex: "price",
                render: (record) => {
                  return (
                    <span>
                      {record.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  );
                },
              },
              {
                title: "Status",
                dataIndex: "status",
                render:(status) =>{
                  if(status=='1'){
                    return   <Switch defaultChecked onChange={onChange} />
                  }else{
                    return <Switch  CloseOutlined onChange={onChange} />
                  }
                }
              
              },
            ]}
            dataSource={componentDetail}
            pagination={{
              pageSize: 6,
            }}
          ></Table>
        </Modal>
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
              render: (record) => {
                return (
                  <span>
                    {record.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                );
              },
            },

            {
              title: "Amount",
              dataIndex: "amount",
            },
            {
              title: "Status",
              dataIndex: "status",
              render:(status) =>{
                if(status=='1'){
                  return   <Switch defaultChecked onChange={onChange} />
                }else{
                  return <Switch  CloseOutlined onChange={onChange} />
                }
              }
            },
            {
              title: "Date",
              dataIndex: "payDate",
              render: (date) => <span>{date}</span>,
            },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 6,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setComponentDetail(record.componentDetail);
                showModal();
              },
            };
          }}
        ></Table>
      </Space>
    );



}

export default Orders

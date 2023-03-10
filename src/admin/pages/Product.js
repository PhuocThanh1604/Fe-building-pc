import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
const Product = () => {
  const getCustomers = () => {
    return fetch("https://dummyjson.com/products").then((res) => res.json());
  };
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.products);
      setLoading(false);
    });
  }, []);
  return (
    <Space size={20} direction="vertical" style={{ width: "100%" }}>
      <Typography.Title level={4}>Customers</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "thumbnail",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "Title",
            dataIndex: "title",
          },
          {
            title: "Brand",
            dataIndex: "brand",
          },
          {
            title: "Price",
            dataIndex: "price",
          },
          {
            title: "Discount Percentage",
            dataIndex: "discountPercentage",
          },
          {
            title: "Category",
            dataIndex: "category",
          },

          {
            title: "Rating",
            dataIndex: "rating",
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
};

export default Product;

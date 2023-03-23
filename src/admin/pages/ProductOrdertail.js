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
function ProductOrdertail() {

const { Title, Paragraph, Text, Link } = Typography;
const [imageProduct, setImageProduct] = useState('');
const [images, setImages] = useState(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  setImageProduct("https://product.hstatic.net/1000026716/product/"+file.name);
};
const [form, setForm] = useState({
  amount: 0,
  productID: "",
  imageProduct:"",
});

  const updateInfo = (info) => {
    setForm({
      productID: info.productID,
      amount: info.amount,
      imageProduct: info.imageProduct,});
  };
  const onSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append("imageProduct", imageProduct);
      setLoading(true);
    try {
        if (form.status !== "save") {
          const res = await axios.post(
            "https://server-buildingpc.herokuapp.com/product/updateProduct",
            {
              productID: info.productID,
              amount: info.amount,
              imageProduct: images ? images: form.imageProduct,
            }
          );
          const componentNew = components.filter(
            (f) => f.productID !== form.productID
          );
          setForm({
            productID:"",
            amount: 0,
      
          });
          setImageProduct(null);
          setComponents([...[res.data], ...componentNew]);
          handleCancel();
          setLoading(false);
        } else {
          const res = await axios.post(
            `https://server-buildingpc.herokuapp.com/component/addComponent?amount=${parseInt(
              form.amount
            )}&brandID=${parseInt(
              form.brandID
            )}&categoryID=${encodeURIComponent(form.categoryID)}&componentName=${
              form.componentName
            }&description=${encodeURIComponent(
              form.description
            )}&price=${parseInt(form.price)}`,
            formData
          );
          setComponents([...[res.data],...components]);
          setForm({
            productID: "",
            amount: 0,
          });
          setImages(null);
          handleCancel();
          setLoading(false);
        }
    } catch (error) {
        console.error(error)
        setLoading(false);
    }

 };
  const onChange = (status) => {
    if(status=='1'){
      console.log(`switch to ${status}`);
    }else {
      console.log(`switch to ${status}`);
    }
  };
  
  const getUsers =()=> {
    const token = JSON.parse(localStorage.getItem("access_token"));
    console.log(token.access_token)
    const config = {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    };
    return axios.post("https://server-buildingpc.herokuapp.com/component/addComponent", config)
      .then((response) => {
  
        return response.data;
  
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const getProductAll = () => {
    return fetch("https://server-buildingpc.herokuapp.com/product/getAllProducts").then((res) => res.json());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [components, setcomponents] = useState([]);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  
  };
  const showModalEdit = () => {
    setIsModalOpenEdit(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalOpenEdit(false);
  };

  var x = 1000;
x = x.toLocaleString('en-US', {style : 'currency', currency : 'VND'});
console.log(x);
    const[loading,setLoading] = useState(false);
    const[dataSource,setDataSource] = useState([])
    useEffect(()=>{
        setLoading(true)
        getProductAll().then(res=>{
            setDataSource(res)
            setLoading(false)
        })
    },[])
    function handleChange(key) {
      return (evt) => {
        if (key === "brandID" || key === "categoryID") {
          setForm({
            ...form,
            [key]: evt.value,
          });
        } else {
          setForm({
            ...form,
            [key]: evt.target.value,
          });
        }
      };
    }
    const onSelectFile = (e) => {
      console.log("zxc");
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(e.target.files[0]);
    };
  
    function handleImage(e) {
      const file = e.target.files[0];
      file.preview = URL.createObjectURL(file);
      console.log(e.target.files);
      setImageProduct(file);
    }
    return (
      <Space size={20} direction="vertical" style={{ width: "100%" }}>
        <Typography.Title level={4}> Product Detail</Typography.Title>
        {/* <Button type="primary" onClick={showModal}>
          Add component
        </Button> */}
        <Modal
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          width={1000}
            >
          <Typography> <Title>Component Detail</Title></Typography>
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
                dataIndex: "categoryID",
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
            dataSource={components}
            pagination={{
              pageSize: 6,
            }}
          ></Table>
        </Modal>
        <Modal open={isModalOpenEdit} footer={null} onCancel={handleCancel}>
          <form className="form" onSubmit={onSubmit}>
            <p className="form-title">Edit Product</p>
            <div className="input-container">
              <label>Name </label>
              <input
                value={form.productID}
                onChange={handleChange("productID")}
              />
            </div>
            <div className="input-container">
              <label onClick={getUsers}> Amount</label>
              <input
                type="number"
                value={form.amount}
                onChange={handleChange("amount")}
              />
            </div>           
            <img
              src={
                form.image !== ""
                  ? form.image
                  : "https://pkmdepokutara.depok.go.id/assets/images/default.jpg"
              }
              alt=""
              style={{ width: "150px", marginBottom: "10px" }}
            />
            <div>
                <input type="file" onChange={handleFileUpload} />
                {imageProduct}
               {/* {imageProduct && <div>File name: {imageProduct}</div>} */}
    
              </div>
     
            <button
              className="submit"
              type="submit"
              disabled={loading}
              style={{ opacity: loading ? "0.5" : "1" }}
            >
              {loading ? "...load" : "Submit"}
            </button>
          </form>
        </Modal>
        <Table
          loading={loading}
          columns={[
            {
              title: "Name Product",
              dataIndex: "productID",
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
            { title: "Image", dataIndex: "imageProduct", render: (link) => { 
              
              return <Image height={100} width={100} src={link} />; }, },
            // {
            //   title: "Date",
            //   dataIndex: "payDate",
            //   render: (date) => <span>{date}</span>,
            // },
            // {
            //   title: "Action",
            //   dataIndex: "",
            //   key: "x",
            //   render: (record) => (
            //     <div style={{ 
                  
            //       display: "flex"
                  
                  
            //       }}>
            //       <button
            //         className="confirmButton"
            //         onClick={() => (updateInfo(record),showModalEdit())}
            //       >
            //         Edit
            //       </button>
            //     </div>
            //   ),
            // },
          ]}
          dataSource={dataSource}
          pagination={{
            pageSize: 6,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setcomponents(record.components);
                showModal();
              },
            };
          }}
        ></Table>
      </Space>
    );



}

export default ProductOrdertail

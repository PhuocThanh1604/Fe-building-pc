import { Avatar, Rate, Space, Table, Typography } from "antd";

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Select from 'react-select';
import { storeImageToFireBase } from 'src/utilities/storeImageToFirebase.';


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

  ///
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
  const [categories, setcategories] = useState([])
  const [components, setComponents] = useState([]);
  const [selectedCategory, setCategoryOption] = useState(null);
  const [brand, setBrand] = useState([])
  const [selectedBrand, setBrandOption] = useState(null);
  const [amount, setAmount] = useState(null);

  const [image, setImage] = useState('');
  const [images, setImages] = useState(null);
   const [selectedFile, setSelectedFile] = useState();
  const [form, setForm] = useState({
    componentID:0,
    amount: 0,
    brandID: 0,
    categoryID: "",
    componentName: "",
    description: "",
    price: 0,
    image:"",
    status: "save",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  
  // const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
  //     defaultValues: {
  //         amount: 0,
  //         brandID: 0,
  //         categoryID: '',
  //         componentName: '',
  //         description: '',
  //         image: '',
  //         price: 0,
  //     }
  // });
    const updateInfo = (info) => {
      setForm({
        componentID: info.componentID,
        amount: info.amount,
        brandID: info.brandID,
        categoryID: info.categoryID,
        componentName: info.componentName,
        description: info.description,
        price: info.price,
        image: info.image,
        status: "update",
      });
    };
    const onSubmit = async (e) => {
      e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        setLoading(true);
      try {
          if (form.status !== "save") {
            const res = await axios.post(
              "https://server-buildingpc.herokuapp.com/component/editComponent",
              {
                componentID: form.componentID,
                amount: form.amount,
                brandID: form.brandID.toString(),
                categoryID: form.categoryID,
                componentName: form.componentName,
                description: form.description,
                image: images ? images: form.image,
                price: form.price,
              }
            );
            const componentNew = components.filter(
              (f) => f.componentID !== form.componentID
            );
            setForm({
              componentID:0,
              amount: 0,
              brandID: 0,
              categoryID: "",
              componentName: "",
              description: "",
              price: 0,
              status:"save"
            });
            setImage(null);
            setComponents([...[res.data], ...componentNew]);
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
              componentID: 0,
              amount: 0,
              brandID: 0,
              categoryID: "",
              componentName: "",
              description: "",
              price: 0,
              status: "save",
            });
            setImages(null);
          setLoading(false);
          }
      } catch (error) {
          console.error(error)
          setLoading(false);
      }
  
   };
  
  useEffect(()=>{
      axios
      .get('https://server-buildingpc.herokuapp.com/categoryType/allCategoryType')
      .then((response) => {
        const newArr = [];
        const currentData = response.data;
        [...currentData].map((c, i) =>{
          newArr.push({value: c.categoryTypeID, label: c.categoryTypeName})
        })
      setcategories(newArr);
      })
      axios
        .get(
          "https://server-buildingpc.herokuapp.com/component/allComponent")
        .then((response) => {
          return setComponents(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, [])
  
  useEffect(()=>{
      axios
      .get('https://server-buildingpc.herokuapp.com/brand/allBrand')
      .then((response) => {
        const newArr = [];
        const currentData = response.data;
        [...currentData].map((c, i) =>{
          newArr.push({value: c.brandID, label: c.brandName})
        })
      setBrand(newArr);
      })
  }, [])
  
      function handleImage(e) {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        console.log(e.target.files);
        setImage(file);
      }
    useEffect(
      () => {
        const uploadImage = async () => {
          if (!selectedFile) {
            return;
          }
          const { isSuccess, imageUrl, message } = await storeImageToFireBase(
            selectedFile
          );
          if (isSuccess) {
            setImages(imageUrl);
            return imageUrl;
          } else {
            console.log(message);
          }
        };
        uploadImage();
      },
      // eslint-disable-next-line
      [selectedFile]
    );
    const onSelectFile = (e) => {
      console.log("zxc");
      if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined);
        return;
      }
      setSelectedFile(e.target.files[0]);
    };
  
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
  
  return (

    <>
      <form className="form" onSubmit={onSubmit}>
          <p className="form-title">add Product</p>
          <div className="input-container">
            <label onClick={getUsers}> Amount</label>
            <input
              type="number"
              value={form.amount}
              onChange={handleChange("amount")}
            />
          </div>
          <label>Brand</label>
          <br />
          <Select
            defaultValue={form.brandID}
            onChange={handleChange("brandID")}
            options={brand}
          />
        
          <label>category</label>
          <br />
          <Select
          defaultValue={form.categoryID}
            onChange={handleChange("categoryID")}
            options={categories}
          />
          <div className="input-container">
            <label>compoenentName</label>
            <input
              value={form.componentName}
              onChange={handleChange("componentName")}
            />
          </div>
          <div className="input-container">
            <label>Desc</label>
            <input
              value={form.description}
              onChange={handleChange("description")}
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
          {form.status !== "save" ? (
            <input
              class="form-control"
              type="file"
              id="formFile"
              name="file"
              accept="image/*"
              onChange={onSelectFile}
            />
          ) : (
            <input
              class="form-control"
              type="file"
              id="formFile"
              name="file"
              accept="image/*"
              onChange={handleImage}
            />
          )}
          <div className="input-container">
            <label>Price</label>
            <input
              type="number"
              value={form.price}
              onChange={handleChange("price")}
            />
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
    </>
  
  );
};

export default Product;

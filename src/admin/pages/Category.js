import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { Typography } from "antd";
const Category = () => {
  const [categories, setcategories] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchData = () => {
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
  }

  const handleSelection = (o) => {
    setSelectedOption(o)
    console.log(o)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {/* {categories.length > 0 && (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.categoryTypeName}</li>
          ))}
        </ul>
      )} */}
      <Select
        defaultValue={selectedOption}
        onChange={handleSelection}
        options={categories}
      />
      <Typography.Title level={4}> Inventory</Typography.Title>
      <button>
        <a href="/component/add">Add component</a>
      </button>
    </div>
  );
}

export default Category

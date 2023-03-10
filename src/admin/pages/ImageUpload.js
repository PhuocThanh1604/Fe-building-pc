import React from 'react'
import Axios from 'axios'
import { useState } from 'react'

function ImageUpload() {
  const [image, setImage] = useState('')
  console.log("🚀 ~ file: ImageUpload.js:7 ~ ImageUpload ~ image:", image)
  function handleImage(e) {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    console.log(e.target.files)
    setImage(file)
  }
  function handleApi() {
    const formData = new FormData()
    formData.append('file', image)
    Axios.post('https://server-buildingpc.herokuapp.com/upload', formData).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <input type="file" name="file" onChange={handleImage}></input>
      {image && <img src={image.preview} alt="" width="80%" />}
      <button onClick={handleApi}>Submit</button>
      <button>
        <a href="/dashbroad">Back</a>
      </button>
    </div>
  )
}
export default ImageUpload

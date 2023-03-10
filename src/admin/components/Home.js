import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import { Link } from 'react-router-dom';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
} from "mdb-react-ui-kit";
import { UserAuth } from 'src/api/AuthContext'
const Home = () => {
  const [products, setProducts] = useState([]);
  const { logOut, user } = UserAuth()
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('https://server-buildingpc.herokuapp.com/component/allComponent');
            setProducts(result.data);
        };

        fetchData();
    }, []);
    console.log('1', products)

  // const handleSignOut = async () => {
  //   try {
  //     await logOut()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-8">Home Page</h1>
      {/* <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
        Logout
      </button> */}
      <div>
        <p>Welcome user, {user?.displayName}</p>
      </div>
      <a className='btn btn-primary' href="/login"> Login</a>
      <h1>Component List</h1>
            <div className="row">
                {products.map(component => (
                    <MDBCol md="12" lg="3" className="mb-4">
                        <Link key={component.componentID} to={`/product/${component.componentID}`} >
                            <Product id={component.componentID} componentName={component.componentName} price={component.price} image={component.image} />
                        </Link>
                    </MDBCol>
                ))}
            </div>
    </div>
    
  )
}

export default Home

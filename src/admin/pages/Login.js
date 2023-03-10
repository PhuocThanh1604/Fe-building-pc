import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {
  getAuth,
  firebaseAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'

import { GoogleButton } from 'react-google-button'
import { UserAuth } from 'src/api/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const { user, googleSignIn, accessToken } = UserAuth()
  console.log(user)
  const navigate = useNavigate()
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      if (accessToken) {
        const idToken = await user.getIdToken();
        const response = await axios.post(
          'https://server-buildingpc.herokuapp.com/user/token/google',
         {
             accessToken: accessToken },
             {  headers: {
              Authorization: `Bearer ${idToken}`
         },
         }
        )
        if (response.status == 200) {
          console.log(
            "🚀 ~ file: Login.js:53 ~ handleGoogleSignIn ~ response:",
            response.data.User.roleName
          );
          localStorage.setItem('access_token', JSON.stringify(response.data))
          response.data.User.roleName !== "ROLE_USER"
            ? navigate("/dashbroad")
            : navigate("/");
          // localStorage.setItem('refresh_token', response.data.body.refresh_token)
          // navigate('/dashbroad')
        } else {
          localStorage.removeItem('access_token')
          // localStorage.removeItem('refresh_token')
        }
      } else {
        console.log('Access token not found')
      }
    } catch (error) {
      console.log('error', error)
    }
// const userData = JSON.parse(localStorage.getItem("access_token"))
//     console.log(userData,'3')
//     if (userData.User.roleName !== "ROLE_USER") {
//       navigate("/dashbroad");
//     }
  }

  useEffect(() => {
    const accessTokenString = localStorage.getItem("access_token");
    let accessToken = null;
    if (typeof accessTokenString === "string" && accessTokenString !== "") {
      accessToken = JSON.parse(accessTokenString);
    }
    let userData = null;
    const userDataString = JSON.parse(localStorage.getItem("access_token"));
    if(typeof userDataString ==="string" && userDataString!== ""){
      userData = JSON.parse(userDataString);
    }
    if (accessToken && userData &&  userData.roleName !=="") {
      navigate("/home");
    } else {
      navigate("");
    }
  }, [navigate]);


// const navigate = useNavigate();
//   const { googleSignIn, user, accessToken } = UserAuth();
//   console.log(user)
//   const handleGoogleSignIn = async () => {
//     try {
//       await googleSignIn();
//       if (accessToken !== undefined) {
//         // Thêm điều kiện kiểm tra accessToken
//         const user = auth.currentUser;
//         console.log(user)
//         if (user) {
//           const idToken = await user.getIdToken();
//           const body = JSON.stringify({ accessToken: accessToken });
//           const response = await axios("https://f-homes-be.vercel.app/login", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Access-Control-Allow-Origin": "*",
//               "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
//               "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
//               Authorization: Bearer ${idToken},
//             },
//             body,
//           });

//           console.log(response)
//           if (response.ok) {
//             const data = await response.json();
//             if (
//               data !== undefined &&
//               data.data.user.roleName !== "admin" &&
//               data.data.user.status.user !== true
//             ) {
//               localStorage.setItem("access_token", JSON.stringify(data.data));
//               console.log(data);
//               navigate("/home");
//               //         }
//             } else {
//               setTimeout(() => {
//                 alert("Please you are admin please dont enter");
//               }, 1000);
//             }
//           } else {
//             console.log("Response not OK");
//           }
//         } else {
//           console.log("User not found");
//         }
//       } else {
//         console.log("Access token not found");
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   }

//   useEffect(() => {
//     const accessTokenString = localStorage.getItem("access_token");
//     let accessToken = null;
//     if (typeof accessTokenString === "string" && accessTokenString !== "") {
//       accessToken = JSON.parse(accessTokenString);
//     }

//     const userDataString = localStorage.getItem("access_token");
//     let userData = null;
//     if (typeof userDataString === "string" && userDataString !== "") {
//       userData = JSON.parse(userDataString);
//     }
//     if (accessToken && userData && userData.user.roleName !== "") {
//       navigate("/home");
//     } else {
//       navigate("");
//     }
//   }, [navigate]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
     <div className='login-body'>
    <div className="container" id="container">
        <div class="form-container log-in-container">
            <form action="#">
            <div className="max-w-[240px] m-auto py-4">
                      <GoogleButton onClick={handleGoogleSignIn} />
                    </div>
            </form >
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-right">
                    <img src='https://www.tncstore.vn/image/catalog/BAI%20VIET/PC%20Gaming%20m%E1%BB%9Bi/partner01%20(1).jpg' />
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default Login

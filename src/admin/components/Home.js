
import React from 'react'
import { UserAuth } from 'src/api/AuthContext'

const Home = () => {
  const { logOut, user } = UserAuth()
  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }
  // const [show, setShow] = useState(false)
  // const [isTokenFound, setTokenFound] = useState(false)
  // getToken(setTokenFound)
  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-8">Home Page</h1>
      <button onClick={handleSignOut} className="border py-2 px-5 mt-10">
        Logout
      </button>
      <a className='btn btn-primary' href="/login"> Login</a>
    </div>
    
  )
}

export default Home

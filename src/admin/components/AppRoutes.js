import {BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'
// import Category from '../pages/Admin/Category'
// import Customers from '../pages/Admin/Customers'
// import Dashbroad from '../pages/Admin/Dashbroad'
// import Inventory from '../pages/Admin/Inventory'
// import Login from '../pages/Admin/Login'


import Orders from '../pages/Orders'

function AppRoutes(){
    return( 
    
   
    <Routes>
        <Route path='/' element={<Dashbroad/>}></Route>
        
        <Route path='/inventory' element={<Inventory/>}></Route>
        
        <Route path='/orders' element={<Orders/>}></Route>   
        <Route path='/categories' element={<Category/>}></Route>   
        
        <Route path='/customers' element={<Customers/>}></Route>
        
        {/* <Route path='/uploadfile' element={<UploadFile/>}></Route> */}
 
        {/* <Route path='/login' element={<Login />}></Route> */}
    </Routes>
 
    )
    }
    
    export default AppRoutes
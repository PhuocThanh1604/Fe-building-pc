// import React from 'react'
// import { CFooter } from '@coreui/react'

// const AppFooter = () => {
//   return (
//     <CFooter>
//       <div>
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           Build-pc-team
//         </a>
//         <span className="ms-1">&copy; 2023 .</span>
//       </div>
//       <div className="ms-auto">
//         <span className="me-1">Powered by</span>
//         <a href="#" target="_blank" rel="noopener noreferrer">
//           Webapplication-Admin &amp; Dashboard
//         </a>
//       </div>
//     </CFooter>
//   )
// }

// export default React.memo(AppFooter)


import { Typography } from "antd"

function AppFooter(){
return <div className="AppFooter">
    <Typography.Link href="tel:0933391614">+123456789</Typography.Link>
    <Typography.Link href="https://www.google.com" target={"_bank"}>Google</Typography.Link>
    <Typography.Link href="tel:0933391614">Tern use of</Typography.Link>
    
</div>;
}

export default AppFooter
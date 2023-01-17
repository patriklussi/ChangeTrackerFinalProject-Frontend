import React from 'react'
import { BrowserRouter, createBrowserRouter,RouterProvider } from 'react-router-dom';
import { Router,Routes,Route } from 'react-router-dom'
import Login from "./Views/Login";
import CreateAccount from './Views/CreateAccount';

import Dashboard from './Views/Dashboard';
import ChallengeView from './Views/ChallengeView';
import Profile from './Views/Profile';
export default function Root() {
  const router = createBrowserRouter([
      {
        path:"/",
        element : <Login/>,
      },{
        path:"/createaccount",
        element:<CreateAccount/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/dashboard",
        element: <Dashboard/>
      },
      {
        path:"/challengeview",
        element:<ChallengeView/>
      },
      {
        path:"/profile",
        element:<Profile/>
      }
  ]);
  return (
    <div>
          <RouterProvider  router={router}/>
    </div>
  )
}


// <createBrowserRouter>
//           {
//             path:""
//           }
//             {/* <Routes>
//                 <Route path="/" element={<Landing></Landing> }/>
//                 <Route path="/createaccount" element={<CreateAccount></CreateAccount>} />
//                 <Route path="/login" element={<Login/>}></Route>
//                 <Route path="/dashboard" element={<Dashboard/>}></Route>
//                 <Route path="/challengeview" element={<ChallengeView/>} ></Route>
//             </Routes> */}
//         </createBrowserRouter>
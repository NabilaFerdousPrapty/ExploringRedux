import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Main from "../Pages/Main";
import Home from "../components/Home/Home";
import Login from './../Pages/login/Login';
import SignUp from './../Pages/signup/SignUp';
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
            path: "/",
            element: <Home/>,
        },{
            path:'/login',
            element:<Login/>
        },{
            path:'/signUp',
            element:<SignUp/>
        }
      ]
    },
    
  ]);
  
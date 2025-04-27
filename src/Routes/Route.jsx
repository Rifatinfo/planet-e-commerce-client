import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/SignIn/Login";
import DashboardLayout from "../Layout/DashboardLayout";
import AddPlant from "../Pages/Dashboard/Seller/AddPlant";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/sign-up",
          element: <SignUp/>,
        },
        {
          path: "/sign-in",
          element: <Login/>,
        },
      ],
    },
    {
      path : 'dashboard',
      element : <DashboardLayout/>,
      children : [
        {
          path: 'add-plant',
          element: (
            <AddPlant />
          ),
        },
      ]
    },
    
  ]);

  export default router;
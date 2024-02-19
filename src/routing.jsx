<<<<<<< HEAD
import { createBrowserRouter } from "react-router-dom";

import Register from "./component/Register";
import User from "./component/User";
import Content from "./component/Content";
import UpdateContent from "./component/UpdateContent";
import NotFound404 from "./component/errorComponents/notFoundPage/NotFound404";
import ServerError500 from "./component/errorComponents/serverError/ServerError500";
import Registrationpage from "./component/Registrationpage";
import Login from "./component/Login";
import ForgotPassword from "./component/ForgotPassword";
import Customer from "./component/Customer";
import App from "./App";
import Index from "./landingPage/Index";
import Profile from "./component/Profile";

export const routing = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/content",
        element: <Content />,
      },
      {
        path: "/update",
        element: <UpdateContent />,
      },
      {
        path: "/customer",
        element: <Customer />,
      },
      {
        path: "/profile",
        element: <Profile />
      },
    ],
  },
  {
    path: "/error500",
    element: <ServerError500 />,
  },
  {
    path: "/registrationpage",
    element: <Registrationpage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/home",
    element: <Index />
  },
  {
    path: "*",
    element: <NotFound404 />,
  },
=======
import { createBrowserRouter } from 'react-router-dom';
import NotFound404 from './component/errorComponents/notFoundPage/NotFound404';
import ServerError500 from './component/errorComponents/serverError/ServerError500';
import Registrationpage from './views/auth/Registrationpage';
import Login from './views/auth/Login';
import ForgotPassword from './views/auth/ForgotPassword';
import Customer from './views/customer/Customer';
import App from './App';
import Index from './landingPage/Index';
import DashBoard from './views/dashboard/DashBoard';
import Users from './views/users/Users';

export const routing = createBrowserRouter([
     {
          path: '/',
          element: <App />,
          children: [
               {
                    path: '/dashboard',
                    element: <DashBoard />,
               },
               {
                    path: '/customers',
                    element: <Customer />,
               },
               {
                    path: '/users',
                    element: <Users />,
               },
          ],
     },
     {
          path: '/error500',
          element: <ServerError500 />,
     },
     {
          path: '/register',
          element: <Registrationpage />,
     },
     {
          path: '/login',
          element: <Login />,
     },

     {
          path: '/forgot-password',
          element: <ForgotPassword />,
     },
     {
          path: '/home',
          element: <Index />,
     },
     {
          path: '*',
          element: <NotFound404 />,
     },
>>>>>>> cacb2c918b9aea94e16a22ac67a346835d7bf110
]);

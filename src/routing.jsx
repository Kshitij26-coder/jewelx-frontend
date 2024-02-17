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
    path: "*",
    element: <NotFound404 />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path:"/home",
    element:<Index/>
  }
]);

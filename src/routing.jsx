import { createBrowserRouter } from 'react-router-dom';
import NotFound404 from './component/errorComponents/notFoundPage/NotFound404';
import ServerError500 from './component/errorComponents/serverError/ServerError500';
import Registrationpage from './views/auth/Registrationpage';
import Login from './views/auth/Login';
import ForgotPassword from './views/auth/ForgotPassword';
import App from './App';
import Index from './landingPage/Index';
import DashBoard from './views/dashboard/DashBoard';
import Users from './views/users/Users';
import CreateUser from './views/users/CreateUser';
import Profile from './views/profile/Profile';
import Uom from './views/UOM/Uom';
import AddUom from './views/UOM/AddUom';
import AddSubsidiary from './views/subsidiary/AddSubsidiary';
import Subsidiary from './views/subsidiary/Subsidiary';
import SubsidiaryMaintain from './views/subsidiary/SubsidiaryMaintain';
import MetalAdd from './views/metals/MetalAdd';
import Metal from './views/metals/Metal';
import MetalStock from './views/metals/MetalStock';
import Download from './views/bill/Download';

import AddArticle from './views/article/AddArticle';
import Article from './views/article/Article';
import ArticleCategory from './views/category/ArticleCategory';
import Accounting from './views/Accounting/Accounting';
import CustomerOrder from './views/customerOrders/CustomerOrder';
import Billing from './views/bill/Billing';
import PurchaseUser from './views/userPurchase/PurchaseUser';
import Sales from './views/bill/Sales';
import AddCustomer from './views/customer/AddCustomer';
import Customer from './views/customer/Customer';

export const routing = createBrowserRouter([
     {
          path: '/',
          element: <App />,
          children: [
               {
                    path: '/',
                    element: <DashBoard />,
               },
               {
                    path: '/users',
                    element: <Users />,
               },
               { path: '/users/create', element: <CreateUser update={false} /> },
               {
                    path: '/users/update',
                    element: <CreateUser update={true} />,
               },
               {
                    path: '/customers/add',
                    element: <AddCustomer update={false} />,
               },
               {
                    path: '/customers/update/*',
                    element: <AddCustomer update={true} />,
               },
               {
                    path: '/customers',
                    element: <Customer />,
               },
               {
                    path: '/profile',
                    element: <Profile />,
               },
               {
                    path: '/subsidiary/add',
                    element: <AddSubsidiary update={false} />,
               },
               {
                    path: '/subsidiary',
                    element: <Subsidiary />,
               },
               {
                    path: '/subsidiary/update/*',
                    element: <AddSubsidiary update={true} />,
               },

               {
                    path: '/uom',
                    element: <Uom />,
               },
               {
                    path: '/uom/add',
                    element: <AddUom update={false} />,
               },
               {
                    path: '/uom/update/*',
                    element: <AddUom update={true} />,
               },
               {
                    path: '/metal',
                    element: <Metal />,
               },
               {
                    path: '/metal/add',
                    element: <MetalAdd update={false} />,
               },
               {
                    path: '/metal/update/*',
                    element: <MetalAdd update={true} />,
               },
               {
                    path: '/category',
                    element: <ArticleCategory />,
               },
               {
                    path: '/article',
                    element: <Article />,
               },
               {
                    path: '/article/add',
                    element: <AddArticle update={false} />,
               },
               {
                    path: '/article/update/*',
                    element: <AddArticle update={true} />,
               },
               {
                    path: '/maintenance',
                    element: <SubsidiaryMaintain />,
               },

               {
                    path: '/metal-stock',
                    element: <MetalStock />,
               },
               {
                    path: '/invoice/*',
                    element: <Download />,
               },
               {
                    path: '/accounts',
                    element: <Accounting />,
               },
               {
                    path: '/customer-orders',
                    element: <CustomerOrder />,
               },
               {
                    path: '/bill',
                    element: <Billing />,
               },
               {
                    path: '/sales',
                    element: <Sales />,
               },
               {
                    path: '/purchaseuser',
                    element: <PurchaseUser />,
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
]);

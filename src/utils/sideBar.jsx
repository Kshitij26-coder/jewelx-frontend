import Cookies from 'js-cookie';
import { roles } from './roles';
import AdminSideBar from '../sideBar/AdminSideBar';
import OwnerSideBar from '../sideBar/OwnerSideBar';
import EmployeeSideBar from '../sideBar/EmployeeSideBar';

/**
 *
 * @param {import('react-router').NavigateFunction} navigate
 * @returns
 */
export const getSideBarAsRole = () => {
     const userCookie = Cookies.get('user');

     // Parse the JSON string if the cookie exists
     const userData = userCookie ? JSON.parse(userCookie) : null;
     if (userData?.role) {
          switch (userData.role) {
               case roles.admin:
                    return AdminSideBar;
               case roles.owner:
                    return OwnerSideBar;
               case roles.employee:
                    return EmployeeSideBar;
          }
     } else {
          //user role is not specified return null
          // navigate('/login');
          return null;
     }
};

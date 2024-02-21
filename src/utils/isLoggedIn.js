import Cookies from 'js-cookie';
/**
 *
 * @returns boolean
 * used to check weather the user is logged in
 */
export const isLoggedIn = () => {
     const userCookie = Cookies.get('user');
     // Parse the JSON string if the cookie exists
     const userData = userCookie ? JSON.parse(userCookie) : null;
     if (userData?.role) {
          return true;
     } else {
          return false;
     }
};

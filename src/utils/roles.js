import Cookies from 'js-cookie';
//predefined values for type of users

export const roles = {
     admin: 'A',
     owner: 'O',
     employee: 'E',
};

/**
 *
 * @returns string
 * used to get roles from cookies if logged in else return null
 */
export const getRolesFromCookies = navigate => {
     const userCookie = Cookies.get('user');
     // Parse the JSON string if the cookie exists
     const userData = userCookie ? JSON.parse(userCookie) : null;
     if (userData?.role) {
          switch (userData.role) {
               case roles.admin:
                    return 'Admin';
               case roles.owner:
                    return 'Owner';
               case roles.admin:
                    return 'Employee';
          }
     } else {
          //user role is not specified return null
          navigate('/login');
          return null;
     }
};

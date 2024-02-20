import Cookies from 'js-cookie';

export let getCookiesObject = () => {
     const userCookie = Cookies.get('user');
     // Parse the JSON string if the cookie exists
     return userCookie ? JSON.parse(userCookie) : null;
};

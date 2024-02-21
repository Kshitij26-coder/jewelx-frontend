import Cookies from 'js-cookie';

//used to return a string which can later on concatinated with base url

/**
 *
 * @param {string} endpoint
 * @param {Number} page
 * @returns {string}
 */
export const getUsersPaginatedEndpoint = (endpoint, page) => {
     const userCookie = JSON.parse(Cookies.get('user'));
     //for owner subsidiaryID is not requred but for admin it is required
     http: return `${endpoint}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&role=${userCookie.role}&brand=${userCookie.brandId}&subsidiary=${
          userCookie.role == 'O' ? 0 : userCookie.subsidiaryId
     }`;
};

/**
 *
 * @param {string} endpoint
 * @param {*} id
 * @returns {string}
 */
export const getUsersByIdEndpoint = (endpoint, id) => {
     return `${endpoint}/${id}`;
};

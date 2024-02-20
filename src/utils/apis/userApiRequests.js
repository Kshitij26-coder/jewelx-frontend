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
     return `${endpoint}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&role=${userCookie.role}&brand=${userCookie.brandId}`;
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

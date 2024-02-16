//used to return a string which can later on concatinated with base url

/**
 *
 * @param {string} endpoint
 * @param {Number} page
 * @param {string} role
 * @returns {string}
 */
export const getUsersPaginatedEndpoint = (endpoint, page, role) => {
     return `${endpoint}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&role=${role}`;
};

/**
 *
 * @param {string} endpoint
 * @param {*} id
 * @returns {string}
 */
export const getUsersByIdEndpoint = (endpoint, id) => {
     return 'endpoint' + `/${id}`;
};

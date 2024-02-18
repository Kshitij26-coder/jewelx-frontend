/**
 *
 * @param {string} endpoint
 * @param {*} id
 * @returns {string}
 */
export const getSubsidiariesByIdEndpoint = (endpoint, id) => {
     return `${endpoint}/${id}`;
};

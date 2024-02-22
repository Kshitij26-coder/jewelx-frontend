import { subsidiaryEndPoints } from '../endpoints/subsidiaryEndPoints';
import { getCookiesObject } from '../getCookiesObject';
/**
 *
 * @param {string} endpoint
 * @param {*} id
 * @returns {string}
 */
export const getSubsidiariesByIdEndpoint = page => {
     return `${subsidiaryEndPoints.GET_SUBSIDIARIES_BY_BRAND}/${
          getCookiesObject().brandId}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}
     `;
};

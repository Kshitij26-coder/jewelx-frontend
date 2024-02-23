import { metalEndPoints } from '../endpoints/metalEndPoints';
import { getCookiesObject } from '../getCookiesObject';

export const getMetalsByBrand = page => {
     return `${metalEndPoints.BASE_URL}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brand=${getCookiesObject().brandId}`;
};

export const getMetalByMetalId = metalId => {
     return `${metalEndPoints.BASE_URL}/${metalId}`;
};

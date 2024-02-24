import { metalEndPoints } from '../endpoints/metalEndPoints';
import { metalStockEndPoints } from '../endpoints/metalStockEndpoints';
import { getCookiesObject } from '../getCookiesObject';

export const getMetalsByBrand = page => {
     return `${metalEndPoints.BASE_URL}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brand=${getCookiesObject().brandId}`;
};

export const getMetalByMetalId = metalId => {
     return `${metalEndPoints.BASE_URL}/${metalId}`;
};

export const getMetalStockEndPoint = page => {
     let cookie = getCookiesObject();
     return `${metalStockEndPoints.BASE_ROUTE}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&role=${cookie.role}&subsidiary=${
          cookie.subsidiaryId ? null : 0
     }&brand=${cookie.brandId}`;
};

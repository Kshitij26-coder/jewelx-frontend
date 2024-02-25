import { saleEndPoints } from '../endpoints/saleEndPoints';
import { getCookiesObject } from '../getCookiesObject';

export const getAllSales = page => {
     let cookie = getCookiesObject();
     return `${saleEndPoints.BASE_URL}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&role=${cookie.role}&brand=${cookie.brandId}&subsidiary=${
          cookie.subsidiaryId ? null : 0
     }`;
};

export const getSaleByIdEndPoint = id => {
     return `${saleEndPoints.BASE_URL}/${id}`;
};

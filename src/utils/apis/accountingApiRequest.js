import { accountingEndPoints } from '../endpoints/accountingEndPoints';
import { getCookiesObject } from '../getCookiesObject';

export const getAccountingPagesById = page => {
     const cookie = getCookiesObject();
     return `${accountingEndPoints.BASE_URL}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brand=${cookie.brandId}&subsidiary=${
          cookie.subsidiaryId ? cookie.subsidiaryId : 0
     }&role=${cookie.role}`;
};

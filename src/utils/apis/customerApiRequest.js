import { customerEndPoints } from '../endpoints/customerEndPoints';
import { getCookiesObject } from '../getCookiesObject';

export const getCustomerById = page => {
     return `${customerEndPoints.BASE_URL}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brand=${getCookiesObject().brandId}&subsidiary=${
          getCookiesObject().subsidiaryId == null ? 0 : getCookiesObject().subsidiaryId
     }&role=${getCookiesObject().role}
     `;
};

export const getCustomerByUUID = id => {
     return `${customerEndPoints.BASE_URL}/${id}`;
};

export const getCustomerByBrandId = () => {
     return `${customerEndPoints.BASE_URL}/byBrand?brand=${getCookiesObject().brandId}
     `;
};

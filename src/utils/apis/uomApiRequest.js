import uomEndpoints from "../endpoints/uomEndPoints"
import { getCookiesObject } from "../getCookiesObject"


export const getAllUomEndPoints = (page) => {
    return `${uomEndpoints.BASE_URL}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brandId=${getCookiesObject().brandId}`;
    
}
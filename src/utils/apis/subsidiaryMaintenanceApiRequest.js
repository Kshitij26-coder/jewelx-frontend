import { maintenanceEndPoints } from '../endpoints/maintenanceEndPoints';
import { getCookiesObject } from '../getCookiesObject';

export const getSubsidiaryMaintenanceById = page => {
     return `${maintenanceEndPoints.BASE_ROUTE}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brand=${getCookiesObject().brandId}&subsidiary=${
          getCookiesObject().subsidiaryId == null ? 0 : getCookiesObject().subsidiaryId
     }&role=${getCookiesObject().role}
     `;
};

export const getSubsidiaryMaintenanceByUUID = id => {
     return `${maintenanceEndPoints.BASE_ROUTE}/${id}`;
};

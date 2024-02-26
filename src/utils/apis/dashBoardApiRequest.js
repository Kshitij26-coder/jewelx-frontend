import { dashBoardEndPoints } from '../endpoints/dashBoardEndPoints';
import { getCookiesObject } from '../getCookiesObject';

const cookie = getCookiesObject();
export const getTransactionDaily = () => {
     return `${dashBoardEndPoints.DAILY}?role=${cookie.role}&brand=${cookie.brandId}&subsidiary=${cookie.subsidiaryId ? null : 0}`; // change in dashBordEndPoints.js brandId and SubsidiaryId to  cookie.brandId & for subsidiaryId
};
// export const getTransactionDaily = () => {
//      return `${dashBoardEndPoints.DAILY}?role=${cookie.role}&brand=${1}&subsidiary=${cookie.subsidiaryId ? null : 1}`; // change in dashBordEndPoints.js brandId and SubsidiaryId to  cookie.brandId & for subsidiaryId
// };

// export const getTransactionFive = () => {
//      return `${dashBoardEndPoints.LAST_FIVE}?brand=${1}&subsidiary=${cookie.subsidiaryId ? null : 1}`; // change to cookie.brandId & for subsidiaryId
// };

export const getTransactionFive = () => {
     return `${dashBoardEndPoints.LAST_FIVE}?brand=${cookie.brandId}&subsidiary=${cookie.subsidiaryId ? null : 0}`; // change to cookie.brandId & for subsidiaryId
};

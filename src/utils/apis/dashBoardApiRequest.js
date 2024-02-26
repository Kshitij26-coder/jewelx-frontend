import { dashBoardEndPoints } from '../endpoints/dashBoardEndPoints';
import { getCookiesObject } from '../getCookiesObject';

const cookie = getCookiesObject();
export const getTransactionDaily = () => {
     return `${dashBoardEndPoints.DAILY}?role=${cookie.role}&brand=${cookie.brandId}&subsidiary=${cookie.subsidiaryId ? null : 0}`;
};

export const getTransactionFive = () => {
     return `${dashBoardEndPoints.LAST_FIVE}?brand=${cookie.brandId}&subsidiary=${cookie.subsidiaryId ? null : 0}`;
};

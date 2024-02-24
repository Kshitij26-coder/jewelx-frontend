import { articleCategoryEndpoints } from '../endpoints/articleCategoryEndpoints';
import { articleEndpoints } from '../endpoints/articleStockEndpoints';
import { getCookiesObject } from '../getCookiesObject';

export const getAllItemsById = () => {
     return `${articleCategoryEndpoints.ALL_CATEGORIES}/${getCookiesObject().brandId}`;
};

export const getArticleItemsPagesById = page => {
     const cookie = getCookiesObject();
     return `${articleEndpoints.BASE_ROUTE}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&role=${cookie.role}&subsidiary=${
          cookie.subsidiaryId ? null : 0
     }&brand=${cookie.brandId}`;
};

export const getArticleByIdEndpoint = id => {
     return `${articleEndpoints.BASE_ROUTE}/${id}`;
};

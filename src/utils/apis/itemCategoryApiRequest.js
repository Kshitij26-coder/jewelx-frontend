import { articleCategoryEndpoints } from '../endpoints/articleCategoryEndpoints';
import { getCookiesObject } from '../getCookiesObject';

export const getAllCategoriesById = () => {
     return `${articleCategoryEndpoints.ALL_CATEGORIES}/${getCookiesObject().brandId}`;
};

export const getAlCategoriesPagesById = page => {
     const cookie = getCookiesObject();
     return `${articleCategoryEndpoints.BASE_ROUTE}?page=${page}&size=${import.meta.env.VITE_PAGE_SIZE}&brand=${cookie.brandId}`;
};

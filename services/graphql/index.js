import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_URL_KEY, GET_CATEGORY, GET_CATEGORY_PRODUCT_BY_ID } from '../../services/graphql/schema';

export const getCategories = () => useQuery(GET_CATEGORY);

export const getCategoryProductById = (variable) => useQuery(GET_CATEGORY_PRODUCT_BY_ID, variable);

export const getProductByUrlKey = (variable) => useQuery(GET_PRODUCT_BY_URL_KEY, variable);

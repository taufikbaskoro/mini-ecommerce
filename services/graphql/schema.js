import { gql } from '@apollo/client'

export const GET_CATEGORY = gql`
    query {
        categoryList(filters: {}) {
            id
            name
            image
            include_in_menu
        }
    }
`;

export const GET_CATEGORY_PRODUCT_BY_ID = gql`
    query getCategoryProduct($categoryId: Int!) {
        category(id: $categoryId){
            id
            name
            products {
                items {
                    __typename
                    id
                    name
                    image {
                        url
                    }
                    url_key
                }
            }
        }
    }
`;

export const GET_PRODUCT_BY_URL_KEY = gql`
    query getProduct($urlKey: String!) {
        products(filter: {
            url_key: {
                eq: $urlKey
            }
            }) {
            items {
                id
                name
                __typename
                description {
                html
                }
                image {
                url
                }
                price_range {
                maximum_price {
                    final_price {
                    value
                    }
                    regular_price {
                    value
                    }
                }
                }
                qty_available
                rating_summary
                categories {
                name
                }
            }
        }
    }
`
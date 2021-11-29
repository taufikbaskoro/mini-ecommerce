import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import  ReactHtmlParser from 'react-html-parser'

const GET_PRODUCT_BY_URL_KEY = gql`
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

export default function ProductDetail() {
    const {query} = useRouter()
    const url_key = query.urlKey;
    const {data, loading, error} = useQuery(GET_PRODUCT_BY_URL_KEY, {
        variables: {
            urlKey: url_key
        }
    })

    if(loading) return <h2>Data Loading...</h2>
    if(error) return <p>error: {error}</p>

    const detail = data.products.items;
    console.log(detail);

    return (
        <div>
            {
                detail.map(result => {
                    let price = result.price_range.maximum_price.regular_price.value;
                    let parse = ReactHtmlParser(result.description.html);
                    // console.log(parse)
                    return (
                        <div key={result.id}>
                            <h2>{result.name}</h2>
                            <Image layout={"fixed"} width={60} height={50} src={result.image.url} alt={result.name} />
                            {parse}
                            <p>{price}</p>
                            <Link href={`/`}><a>Back to Home</a></Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

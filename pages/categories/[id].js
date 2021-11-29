import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Home.module.css'

const GET_CATEGORY_PRODUCT_BY_ID = gql`
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
`

export default function CategoryProduct() {
    const { query } = useRouter()
    const id = query.id;
    const { data, loading, error } = useQuery(GET_CATEGORY_PRODUCT_BY_ID, {
        variables: {
            categoryId: id
        }
    });

    if(loading) return <h2>Data Loading...</h2>
    if(error) return <p>error: {error}</p>

    const products = data.category.products.items;

    return (
        <div>
            <div>
                {
                    products.map(product => {
                        return(
                            <div className={styles.menu} key={product.id}>
                                <h2><Link href={`/product/${product.url_key}`}><a>{product.name}</a></Link></h2>
                                {
                                    product.image && (<Image layout={"fixed"} width={60} height={60} src={product.image.url} alt={product.name} />) || (<></>)
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

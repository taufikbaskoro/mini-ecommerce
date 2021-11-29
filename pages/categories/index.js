// import { useQuery } from '@apollo/client'
import { useQuery, gql } from '@apollo/client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'

const GET_CATEGORY = gql`
    query {
        categoryList(filters: {}) {
            id
            name
            image
            include_in_menu
        }
    }
`

const Categories = (props) => {
    const {data, loading, error} = useQuery(GET_CATEGORY);

    if(loading) return <h2>Data Loading...</h2>
    if(error) return <p>error: {error}</p>

    const categories = data.categoryList;

    return (
        <div>
            <div>
                {categories.map(category => {
                    if(category.include_in_menu === 1){
                        return (
                            <div className={styles.menu} key={category.id}>
                                <Link href={`/categories/${category.id}`}><a>{category.name}</a></Link>
                                <br />
                                {
                                    category.image && (<Image layout={"fixed"} width={60} height={60} src={category.image} alt={category.name} />) || (<></>)
                                }
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Categories;
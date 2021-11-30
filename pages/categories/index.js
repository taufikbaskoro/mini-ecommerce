// import { useQuery } from '@apollo/client'
import { useQuery, gql } from '@apollo/client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../../styles/Home.module.css'
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    textAlign: 'center',
}));

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
            <Container xs={{flexGrow: 1}}>
                <Grid container spacing={2}>
                {categories.map(category => {
                    if(category.include_in_menu === 1){
                        return (
                            <Grid item xs={4} className={styles.menu} key={category.id}>
                                <Link href={`/categories/${category.id}`} passHref={true}>
                                    <Item className={styles.paper}>
                                        <a className={styles.anchor}>{category.name}</a>
                                        <br />
                                        {
                                            category.image && (<Image layout={"fixed"} width={60} height={60} src={category.image} alt={category.name} />) || (<></>)
                                        }
                                    </Item>
                                </Link>
                            </Grid>
                        )
                    }
                })}
                </Grid>
            </Container>
        </div>
    )
}

export default Categories;
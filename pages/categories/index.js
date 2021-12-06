import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCategories } from '../../services/graphql'

import styles from '../../styles/Home.module.css'
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => {
    return ({
        padding: '1rem',
        textAlign: 'center',
    })
});

const Categories = (props) => {
    const {data, loading, error} = getCategories();

    if(loading) return <Typography variant="p">Data Loading...</Typography>
    if(error) return <Typography variant="p">error: {error}</Typography>

    const categories = data.categoryList;

    return (
        <div>
            <Container xs={{flexGrow: 1}}>
                <Grid container spacing={2}>
                {categories.map((category, index) => {
                    if(category.include_in_menu === 1){
                        return (
                            <Grid item xs={4} className={styles.menu} key={category.id}>
                                <Link href={`/categories/${category.id}`} passHref={true}>
                                    <Item className={styles.paper} code={index}>
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
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
import Layout from '../../components/layout';

import { Container, Typography, Button } from '@mui/material'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

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

    if(loading) return <Typography variant="h5">Data Loading...</Typography>
    if(error) return <Typography variant="h5">Error : {error}</Typography>

    const products = data.category.products.items;
    const total = products.length

    if(total === 0) {
        return (
            <Layout>
                <Typography variant="h3">No Product found in this category</Typography>
            </Layout>
        )
    }

    return (
        <Layout>
            <Typography variant="h3">Product List</Typography>
            <Container xs={{flexGrow: 1}} sx={{margin: "2rem 0"}}>
                <Grid container spacing={2}>
                {
                    products.map(product => {
                        return(
                            <Grid item xs={4} key={product.id}>
                                <Card sx={{ maxWidth: 345 }}>
                                    {
                                        product.image && (
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={product.image.url}
                                                alt={product.name}
                                            />
                                        ) || (<></>)
                                    }
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link href={`/product/${product.url_key}`} passHref={true}>
                                            <Button size="small">Detail</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </Container>
        </Layout>
    )
}

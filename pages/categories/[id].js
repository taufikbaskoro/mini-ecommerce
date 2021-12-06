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
import { getCategoryProductById } from '../../services/graphql';

export default function CategoryProduct() {
    const { query } = useRouter()
    const id = query.id;
    const { data, loading, error } = getCategoryProductById({
        variables: {
            categoryId: id
        }
    });

    if(loading) return <Layout><Typography variant="p">Data Loading...</Typography></Layout>
    if(error) return <Layout><Typography variant="p">Error : {error}</Typography></Layout>

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
            <Typography variant="h4">Product List</Typography>
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
                                        <Typography gutterBottom align="center" variant="p" component="div">
                                            {product.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link href={`/product/${product.url_key}`} passHref={true}>
                                            <Button fullWidth size="small">Detail</Button>
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

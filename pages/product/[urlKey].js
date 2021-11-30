import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import  ReactHtmlParser from 'react-html-parser'
import Layout from '../../components/layout';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAlert from '@mui/material/Alert';
import { Container, Grid } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function ProductDetail() {
    const [carts, setCarts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const {query} = useRouter()
    const url_key = query.urlKey;

    useEffect(() => {
        let cart = sessionStorage.getItem('cart');
        // console.log("cart : ", cart)
        if(cart === null){
            setCarts([])
        }else{
            // console.log(cart)
            let result = JSON.parse(cart) || [];
            setCarts(result)
        }
    }, [])

    const {data, loading, error} = useQuery(GET_PRODUCT_BY_URL_KEY, {
        variables: {
            urlKey: url_key
        }
    })

    if(loading) return <h2>Data Loading...</h2>
    if(error) return <p>error: {error}</p>

    const detail = data.products.items;

    const handleClick = () => {
        setIsOpen(true)
    }

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setIsOpen(false);
    }

    const handleAddToCart = (item) => {
        if(carts.length === 0){
            let arrayItem = [item]
            let savedItem = JSON.stringify(arrayItem)
            sessionStorage.setItem('cart', savedItem)
        }else{
            let shoppingCart = carts;
            shoppingCart.push(item);
            let savedItem = JSON.stringify(shoppingCart)
            sessionStorage.setItem('cart', savedItem)
        }
        handleClick();
    }

    return (
        <Layout>
            <Container xs={{flexGrow: 1}}>
                <Grid container>
                    <Grid item xs={2}></Grid>
                    {
                        detail.map(result => {
                            let price = result.price_range.maximum_price.regular_price.value;
                            let parse = ReactHtmlParser(result.description.html);
                            // console.log(parse)
                            return (
                                <Grid item xs={8} key={result.id}>
                                    <Card>
                                        <CardHeader
                                            title={result.name}
                                            subheader={`Rp. ${price}`}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={result.image.url}
                                            alt={result.name}
                                        />
                                        <CardContent>
                                            {parse}
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton onClick={() => {handleAddToCart(result)}}  aria-label="add to favorites">
                                                <ShoppingCartIcon />
                                            </IconButton>
                                        </CardActions>
                                        </Card>
                                </Grid>
                            )
                        })
                    }
                    <Grid item xs={2}></Grid>
                </Grid>
                <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Product added to cart
                    </Alert>
                </Snackbar>
            </Container>
        </Layout>
    )
}

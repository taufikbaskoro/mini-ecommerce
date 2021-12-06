import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import  ReactHtmlParser from 'react-html-parser'
import Layout from '../../components/layout';
import useStyles from './styles';

import { getProductByUrlKey } from '../../services/graphql';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuiAlert from '@mui/material/Alert';
import { Container, Grid, Paper, Button } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function ProductDetail() {
    const [carts, setCarts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const {query} = useRouter()
    const url_key = query.urlKey;
    const styles = useStyles();

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

    const {data, loading, error} = getProductByUrlKey({
        variables: {
            urlKey: url_key
        }
    })

    if(loading) return <Layout><Typography variant="p">Data Loading...</Typography></Layout>
    if(error) return <Layout><Typography variant="p">error: {error}</Typography></Layout>

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
                                <Grid item xs={12} key={result.id}>
                                    <Paper className={styles.paper}>
                                        <Grid container>
                                            <Grid item xs={4} className={styles.image}>
                                                <Image
                                                    src={result.image.url}
                                                    alt={result.name}
                                                    width={400}
                                                    height={500} />
                                            </Grid>
                                            <Grid item xs={8} className={styles.description}>
                                                <div>
                                                    <Typography variant="h6">{result.name}</Typography>
                                                    <Typography variant="subtitle1">Rp. {price}</Typography>
                                                </div>
                                                <Typography variant="subtitle2">{parse}</Typography>
                                                <Button
                                                    color="warning"
                                                    onClick={() => {handleAddToCart(result)}}
                                                    loadingPosition="start"
                                                    startIcon={<ShoppingCartIcon />}
                                                    variant="outlined"
                                                >
                                                    Add to cart
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
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

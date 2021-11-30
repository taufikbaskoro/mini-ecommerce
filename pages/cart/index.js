import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout'

import { Typography, Container, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Cart() {
    const [carts, setCarts] = useState([]);
    const [isDelete, setIsDelete] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getCart = () => {
        let cart = sessionStorage.getItem('cart')
        if(cart === null || cart.length === 0){
            setCarts(null)
        }else{
            let result = JSON.parse(cart) || [];
            setCarts(result);
        }
    }

    useEffect(() => {
        getCart();
    }, [])

    useEffect(() => {
        getCart();
    }, [isDelete])

    const handleClick = () => {
        setIsOpen(true)
    }

    const handleClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setIsOpen(false);
    }

    const handleDeleteItem = (item) => {
        let data = carts.filter((cart, index) => {
            return index !== item;
        })
        let savedItem = JSON.stringify(data)
        sessionStorage.setItem('cart', savedItem);
        handleClick();
        setIsDelete(!isDelete);
    }

    return (
        <Layout>
            <Typography variant="h3">Product List</Typography>
            <Container xs={{flexGrow: 1}} sx={{margin: "2rem 0"}}>
                <Grid container spacing={2}>
                    {
                        carts && (
                        carts.map((cart, index) => {
                            let price = cart.price_range.maximum_price.regular_price.value;
                            return(
                                <Grid item xs={4} key={cart.id}>
                                    <Card>
                                        <CardHeader
                                            title={cart.name}
                                            subheader="Jumlah"
                                        />
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={cart.image.url}
                                            alt={cart.name}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" color="text.secondary">
                                                Harga : {`Rp. ${price}`}
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            <IconButton onClick={() => {handleDeleteItem(index)}}  aria-label="add to favorites">
                                                <DeleteIcon />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                        })) || 'No Item in cart'
                    }
                </Grid>
                <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Product deleted from cart
                    </Alert>
                </Snackbar>
            </Container>
        </Layout>
    )
}

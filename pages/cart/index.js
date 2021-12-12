import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Layout from '../../components/layout'

import { Typography, Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
            <Typography textAlign={'center'} variant="h3">Shopping Cart</Typography>
            <Container xs={{flexGrow: 1}} sx={{margin: "0 0"}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="center">Image Product</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                    {
                        carts && (
                        carts.map((cart, index) => {
                            let price = cart.price_range.maximum_price.regular_price.value;
                            return(
                                <TableRow
                                    key={cart.id} 
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                        <TableCell align="left">{cart.name}</TableCell>    
                                        <TableCell align="center">
                                            <Image 
                                                width={100}
                                                height={100}
                                                src={cart.image.url} 
                                                alt={cart.name} />
                                        </TableCell>    
                                        <TableCell align="center">Rp. {price}</TableCell>    
                                        <TableCell align="center">
                                            <IconButton onClick={() => handleDeleteItem(index)} aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>    
                                </TableRow>
                            )
                        })) || 'No Item in cart'
                    }
                    </TableBody>
                    </Table>
                </TableContainer>
                <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        Product deleted from cart
                    </Alert>
                </Snackbar>
            </Container>
        </Layout>
    )
}

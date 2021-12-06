import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import styles from '../styles/Home.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = ['Home', 'Cart']

export default function Layout({ children }) {
    return (
        <div>
            <Head>
                <title>Mini E-Commerce</title>
            </Head>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Mini-Commerce
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {
                                pages.map((page) => {
                                    let loc = '/';
                                    if(page === 'Cart') {
                                        loc = '/cart';
                                    }       
                                    return (
                                        <Link key={page} href={loc} passHref={true}>
                                            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                                                {page}
                                            </Button>
                                        </Link>
                                    )
                                })
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <main className={styles.main}>{children}</main>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography
                            variant="p"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, textAlign: 'center'}}
                        >
                            Copyright to the creator 
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

// pages/[id].js
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import Layout from '../../../component/layout';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { param } from 'framer-motion/client';
// Create button to go back to Orders page

const DynamicPage = ({data}) => {
    const router = useRouter();
    console.log(data);
    
    const handleBackClick = () => {
        router.push({pathname: `/orders`})
    }

      return (
        <Layout>
            <Box sx={{ padding: 3 }}>
                <Paper elevation={3} sx={{ padding: 3 }}>
                    <Box
                        sx={{
                        display: 'flex',
                        justifyContent: 'space-between', // Aligns items to the left and right
                        alignItems: 'center', // Vertically centers items
                        marginBottom: 2,
                        }}
                    >
                        <Typography variant="h4">Transaction Details</Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between', // Aligns items to the left and right
                                alignItems: 'center', // Vertically centers items
                                marginBottom: 2,
                            }}
                            >
                            
                            <Button variant="contained" color="primary" onClick={handleBackClick}>
                                Back
                            </Button>
                        </Box>
                    </Box>
                    <Divider sx={{ marginBottom: 2 }} />
            
                    {/* Transaction Information */}
                    <Typography variant="h6" gutterBottom>
                    Transaction Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Transaction ID:</strong> {data.transaction_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Order ID:</strong> {data.order_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Transaction Date:</strong> {new Date(data.transaction_date).toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Amount:</strong> ${data.amount.toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
            
                    {/* Buyer Information */}
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    Buyer Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Buyer ID:</strong> {data.buyer_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Buyer Name:</strong> {data.buyer.buyer_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Email:</strong> {data.buyer.email}
                            </Typography>
                        </Grid>
                    </Grid>
            
                    {/* Seller Information */}
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    Seller Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Seller ID:</strong> {data.seller_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Seller Name:</strong> {data.seller.seller_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Email:</strong> {data.seller.email}
                            </Typography>
                        </Grid>
                    </Grid>
            
                    {/* Order Information */}
                    <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    Order Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Order ID:</strong> {data.order.order_id}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1">
                            <strong>Order Date:</strong> {new Date(data.order.order_date).toLocaleString()}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Layout>
      );
    };

export async function getServerSideProps(context) {
    const response = await fetch('http://localhost:3000/api/orders/detail_query/transaction_find_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query_id: context.params.id}),
    });
    const data = await response.json();

    return {
        props: {
            data: data,
        },
    };
}

export default DynamicPage;

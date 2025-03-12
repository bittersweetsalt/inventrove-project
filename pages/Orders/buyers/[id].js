// pages/[id].js
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import Layout from '../../../component/layout';
// Create button to go back to Orders page

const DynamicPage = ({data}) => {
    const router = useRouter();
   
    const handleBackClick = () => {
        router.push({pathname: `/orders`})
    }

  return (
    <Layout>
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        {/* Header with Button on the Right */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between', // Aligns items to the left and right
            alignItems: 'center', // Vertically centers items
            marginBottom: 2,
          }}
        >
          <Typography variant="h4">Buyer Details</Typography>
          <Button variant="contained" color="primary" onClick={handleBackClick}>
            Back
          </Button>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Buyer Information */}
        <Typography variant="h6" gutterBottom>
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
              <strong>Buyer Name:</strong> {data.buyer_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Email:</strong> {data.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Phone Number:</strong> {data.phone_number}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Shipping Address:</strong> {data.shipping_address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Billing Address:</strong> {data.billing_address}
            </Typography>
          </Grid>
        </Grid>

        {/* Transactions Information */}
        <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
          Transactions
        </Typography>
        {data.transactions.map((transaction) => (
          <Paper key={transaction.transaction_id} elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Transaction ID:</strong> {transaction.transaction_id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Order ID:</strong> {transaction.order_id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Buyer ID:</strong> {transaction.buyer_id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Seller ID:</strong> {transaction.seller_id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Transaction Date:</strong> {new Date(transaction.transaction_date).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Amount:</strong> ${transaction.amount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Paper>
    </Box>
    </Layout>
  );
};

export async function getServerSideProps(context) {
    const response = await fetch('http://localhost:3000/api/orders/detail_query/buyer_find_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({query_id: context.params.id}),
    });
    const data = await response.json();
    console.log(data);

    return {
        props: {
            data: data,
        },
    };
}


export default DynamicPage;

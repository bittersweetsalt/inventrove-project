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
              <Typography variant="h4">Customer Details</Typography>
              <Button variant="contained" color="primary" onClick={handleBackClick}>
                Back
              </Button>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
    
            {/* Customer Information */}
            <Typography variant="h6" gutterBottom>
              Customer Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Customer ID:</strong> {data.customer_id}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Email:</strong> {data.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>First Name:</strong> {data.first_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {data.last_name}
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
    
            {/* Orders Information */}
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
              Orders
            </Typography>
            {data.orders.map((order) => (
              <Paper key={order.order_id} elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Order ID:</strong> {order.order_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Customer ID:</strong> {order.customer_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Order Status ID:</strong> {order.order_status_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Total Price:</strong> ${order.total_price.toFixed(2)}
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
    const response = await fetch('http://localhost:3000/api/orders/detail_query/customer_find_id', {
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

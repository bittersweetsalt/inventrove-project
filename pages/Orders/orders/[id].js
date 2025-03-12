// pages/[id].js
import React, { useState } from 'react'; // Add useState
import { Button, TextField } from '@mui/material'; // Add TextField
import { useRouter } from 'next/router';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import Layout from '../../../component/layout';

const DynamicPage = ({ data }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const handleBackClick = () => {
    router.push({ pathname: `/orders` });
  };

  // Filter order items based on search query
  const filteredOrderItems = data.orderitems.filter((item) =>
    item.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <Box sx={{ padding: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          {/* Header with Button on the Right */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Typography variant="h4">Order Details</Typography>
            <Button variant="contained" color="primary" onClick={handleBackClick}>
              Back
            </Button>
          </Box>
          <Divider sx={{ marginBottom: 2 }} />

          {/* Order Information */}
          <Typography variant="h6" gutterBottom>
            Order Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Order ID:</strong> {data.order_id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Customer ID:</strong> {data.customer_id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Order Date:</strong> {new Date(data.order_date).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Order Status ID:</strong> {data.order_status_id}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Total Price:</strong> ${data.total_price.toFixed(2)}
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

          {/* Order Items Information */}
          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Order Items
          </Typography>
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search order items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          {filteredOrderItems.length > 0 ? (
            filteredOrderItems.map((item) => (
              <OrderItem key={item.order_item_id} item={item} /> // Use the new component
            ))
          ) : (
            <Typography variant="body1">No order items found.</Typography>
          )}

          {/* Shipping Information */}
          <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
            Shipping
          </Typography>
          {data.shipping.length > 0 ? (
            data.shipping.map((shipment) => (
              <Paper key={shipment.shipping_id} elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Shipping ID:</strong> {shipment.shipping_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Shipping Method:</strong> {shipment.shipping_method}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Tracking Number:</strong> {shipment.tracking_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                      <strong>Shipping Date:</strong> {new Date(shipment.shipping_date).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))
          ) : (
            <Typography variant="body1">No shipping information found.</Typography>
          )}
        </Paper>
      </Box>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:3000/api/orders/detail_query/order_find_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query_id: context.params.id }),
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
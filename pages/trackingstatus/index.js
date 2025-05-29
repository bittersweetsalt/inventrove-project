import React, { useState } from 'react';
import { 
  TextField, 
  styled, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  CircularProgress, 
  Alert,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import Layout from '../../component/layout';
import { LocalShipping, CalendarToday, Receipt, Person, Paid } from '@mui/icons-material';

const headerColor = "#61d2ff";
const hoverColor = "#a8e4ff";
const highlightColor = "#b2dfdb";
const textColor = "#013247";

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.9rem',
  padding: theme.spacing(1),
  marginLeft: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": { color: textColor },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: headerColor },
    "&:hover fieldset": { borderColor: hoverColor },
    "&.Mui-focused fieldset": { borderColor: highlightColor },
  },
  "& .MuiInputBase-input": { color: textColor },
  "& .MuiFormHelperText-root": { color: textColor },
}));

export default function TrackingStatus() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shippingData, setShippingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ number: trackingNumber });
      const response = await fetch(`/api/tracking/tracking_query?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch tracking information');
      }

      const data = await response.json();
      setShippingData(data);
    } catch (err) {
      setError(err.message);
      setShippingData(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatus = () => {
    if (!shippingData) return null;
    const isDelivered = new Date() > new Date(shippingData.estimated_delivery_date);
    return isDelivered ? 'Delivered' : 'In Transit';
  };

  return (
    <Layout>
      <Paper elevation={1} sx={{ mt: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom color={textColor} sx={{ fontWeight: 'bold' }}>
          Track Your Package
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <StyledTextField
            label="Enter Tracking Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            helperText="Example: FEDEX222222222"
            disabled={loading}
            InputProps={{
              startAdornment: <LocalShipping sx={{ color: textColor, mr: 1 }} />
            }}
          />
          
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: headerColor,
              '&:hover': { backgroundColor: hoverColor },
              py: 1.5,
              fontSize: '1rem'
            }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Searching...' : 'Track Package'}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        {shippingData && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2,
              backgroundColor: '#f5f5f5',
              p: 2,
              borderRadius: 1
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Tracking Information
              </Typography>
              <StatusChip 
                label={getStatus()} 
                color={getStatus() === 'Delivered' ? 'success' : 'warning'}
                size="medium"
              />
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, border: `1px solid ${headerColor}` }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <LocalShipping sx={{ mr: 1 }} /> Shipping Details
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography><strong>Tracking Number:</strong> {shippingData?.tracking_number}</Typography>
                    <Typography sx={{ mt: 1 }}>
                      <strong>Carrier:</strong> 
                      {shippingData?.tracking_number?.startsWith('UPS') ? ' UPS' : 
                       shippingData?.tracking_number?.startsWith('FEDEX') ? ' FedEx' :
                       shippingData?.tracking_number?.startsWith('USPS') ? ' USPS' : ' DHL'}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <strong>Shipped Date:</strong> {formatDate(shippingData?.shipped_date)}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <strong>Estimated Delivery:</strong> {formatDate(shippingData?.estimated_delivery_date)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ p: 2, border: `1px solid ${headerColor}` }}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Receipt sx={{ mr: 1 }} /> Order Details
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography><strong>Order ID:</strong> #{shippingData?.order_id}</Typography>
                    <Typography sx={{ mt: 1 }}>
                      <strong>Order Date:</strong> {formatDate(shippingData?.order?.order_date)}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <strong>Customer ID:</strong> {shippingData?.order?.customer_id}
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                      <strong>Total Amount:</strong> ${shippingData?.order?.total_price.toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  borderColor: headerColor,
                  color: textColor,
                  '&:hover': { borderColor: hoverColor }
                }}
                onClick={() => {
                  setShippingData(null);
                  setTrackingNumber('');
                }}
              >
                Track Another Package
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Layout>
  );
};
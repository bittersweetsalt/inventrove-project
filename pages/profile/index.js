import React from 'react';
import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import Layout from '../../component/layout';

const ProfilePage = () => {
  // Placeholder user data
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    jobTitle: "Product Manager",
    department: "Product",
    profilePic: "/path/to/profile-pic.jpg", // Replace with your image path
  };

  return (
    <Box>
        <Layout>
            <Grid container sx={{pt: 8}}>
                <Container maxWidth="sm">
                <Paper elevation={3} style={{ padding: 24 }}>
                    <Box display="flex" justifyContent="center" marginBottom={2}>
                    <Avatar
                        alt={user.name}
                        src={user.profilePic}
                        style={{ width: 120, height: 120 }}
                    >
                        {!user.profilePic && <AccountCircle style={{ fontSize: 120 }} />}
                    </Avatar>
                    </Box>
                    <Typography variant="h4" align="center" gutterBottom>
                    {user.name}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                    {user.email}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                    {user.jobTitle} - {user.department}
                    </Typography>
                    <Box marginTop={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <Typography variant="h6">Additional Info</Typography>
                        <Typography variant="body1">Phone: (123) 456-7890</Typography>
                        <Typography variant="body1">Address: 123 Business St, Suite 456</Typography>
                        </Grid>
                    </Grid>
                    </Box>
                </Paper>
                </Container>
            </Grid>
            
        </Layout>
    </Box>
    
  );
};

export default ProfilePage;

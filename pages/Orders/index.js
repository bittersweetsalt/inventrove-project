import { Box, Button, Grid, Tabs, Tab, Typography, styled } from "@mui/material";
import Layout from "../../component/layout";
import TransactionList from "./transactionlist";
import SellerList from "./sellerlist";
import BuyerList from "./buyerlist";
import CustomerList from "./customerlist";
import OrderList from "./orderlist";
import { useState } from "react";

const tabsConfig = [
    { label: "Transactions", component: <TransactionList /> },
    { label: "Sellers", component: <SellerList /> },
    { label: "Buyers", component: <BuyerList /> },
    { label: "Customers", component: <CustomerList /> },
    { label: "Orders", component: <OrderList /> },
];

const StylishButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#00b6ff',
    color: '#FFFFFF',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '10px',
    '&:hover': {
        backgroundColor: '#61d2ff',
    },
}));

const tabStyles = {
    textTransform: 'none',
    fontWeight: 'normal',
    '&.Mui-selected': {
        fontWeight: 'bold',
        color: 'primary.main',
    },
};

export default function Orders() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <Grid container spacing={0} sx={{ width: '100%', margin: 0, padding: 0 }}>
                {/* Button Row */}
                <Grid container justifyContent="flex-end" sx={{ width: '100%', margin: 0, padding: 0, pb: 2 }}>
                    {/* Add any buttons or additional content here */}
                </Grid>

                {/* Tabs */}
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        indicatorColor="primary"
                        textColor="primary"
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        {tabsConfig.map((tab, index) => (
                            <Tab key={index} label={tab.label} sx={tabStyles} />
                        ))}
                    </Tabs>
                </Grid>

                {/* Content */}
                <Grid item xs={12}>
                    {tabsConfig[value].component}
                </Grid>
            </Grid>
        </Layout>
    );
}
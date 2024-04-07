import { Box, Card, Grid, Tabs, Tab, Typography } from "@mui/material";
import StickyHeadTable from "../../PagesComponent/tablelist";
import Layout from "../../PagesComponent/layout";
import { useRouter } from 'next/router';
import TransactionList from "./TransactionList";
import SellerList from "./SellerList";
import BuyerList from "./BuyerList";
import CustomerList from "./CustomerList";
import OrderList from "./OrderList";
import { useState, useEffect } from "react";

const array_list = [
    "Transactions", "Sellers", "Buyers", "Customers", "Orders"
]


export default function Orders(){
    
    const [value, setValue] = useState(0); // State to manage the selected tab index

    // Function to handle tab change
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    // useEffect(() => {
    //     console.log(value);

    // },[value]);
    let content;

    if (value == 0){
        content = <TransactionList></TransactionList>
    }
    else if (value == 1){
        content = <SellerList></SellerList>
    }
    else if (value == 2){
        content = <BuyerList></BuyerList>
    }
    else if (value == 3){
        content = <CustomerList></CustomerList>
    }
    else if (value == 4){
        content = <OrderList></OrderList>
    }
    
    return(
        <Box>
            <Layout>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {array_list.map((item, index) =>(
                                <Tab key={index} label={item}/>
                            ))}         
                        </Tabs>
                    </Box>
                </Box>
                {content}
            </Layout>
        </Box>       
    )
}
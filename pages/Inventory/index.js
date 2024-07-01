import { Box, Paper, Button, Card, Grid, Tabs, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Layout from "../../PagesComponent/layout";
import ProductAdd from "./ProductAdd/ProductAdd";
import ProductList from "./ProductList/productList";


export default function Inventory(){
    
    const [value, setValue] = useState(0); // State to manage the selected tab index

    // Function to handle tab change
    const addItem = (event, newValue) => {
      setValue(1);
    };

    function backToProductList(){
        console.log("Back Button Pressed")
        setValue(0);
    };

    useEffect(() => {
        console.log("Inventory Page - and value: ", value);

    },[value]);

    let content;

    if (value == 0){
        content = <ProductList backToProductList={backToProductList}></ProductList>
    }
    else if (value == 1){
        content = <ProductAdd backToProductList={backToProductList} ></ProductAdd>
    }
    
    // else if (value == 3){
    //     content = <CustomerList></CustomerList>
    // }
    // else if (value == 4){
    //     content = <OrderList></OrderList>
    // }

    return(
        <Box>
            <Layout>
                <Box sx={{ width: '100%' }}>
                    <Grid
                        container
                    >
                        <Grid
                            item
                            container
                            justifyContent={"right"}
                        >
                            <Paper>
                                <Button onClick={addItem}>
                                    Add Item
                                </Button>
                            </Paper>
                            
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            {content}
                        </Grid>
                        {/* <Grid>
                            <ImageSubTest></ImageSubTest>
                        </Grid> */}
                    </Grid>
                    
                </Box>
            </Layout>
        </Box>       
    )
}
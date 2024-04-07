import { Paper, Box, Card, Grid, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function OrderListComponent( datalist ){
    console.log("this is the dataset");
    console.log(datalist);
    return (
        <Paper>
            
                <List>       
                    <ListItem key={datalist?.id}>
                        {/* {item.buyer.email}
                        {item.buyer.name}
                        {item.buyer.phone_number}
                        {item.item.name}
                        {item.item.description}
                        
                        {item.seller.name}
                        {item.seller.email} */}
    
                        <ListItemText>
                            <Typography variant="h6">{datalist?.name}</Typography>
                            <Typography variant="body2">
                                Transation: {datalist?.quantity}
                            </Typography>
                    
                            <Typography variant="body2">
                            Purchased by: {datalist?.buyer?.name}
                            </Typography>
                            <Typography variant="body2">
                            Sold by: {datalist?.seller?.name}
                            </Typography>
                            <Typography variant="caption">
                            Date: {datalist?.transaction_date}
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List>
        </Paper>
    );
}

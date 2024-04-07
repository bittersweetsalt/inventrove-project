import { Paper, Box, Card, Grid, List, ListItem, ListItemText, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import StickyHeadTable from "../../PagesComponent/tablelist";
import Layout from "../../PagesComponent/layout";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import React, { useState } from "react";

export default function OrderList(){
    
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/orders/order_list');
                const data = await response.json();
                
                setData(data);
                console.log(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCellClick = (row) =>{
        console.log("This is clicked");
        // console.log(row);
        // const router = useRouter();
    }   

    const handleClick = (row) => {
        // console.log(row);
        router.query.N
        router.push({ pathname: `/Orders/orders/${row.transaction_id}`, query: row});
    };

    return (
        <Paper>
            {isLoading ? "Loading..." : ""}
            {error && <Box style={{ color: "red" }}>{error}</Box>}
            {data && 
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Customer Email</TableCell>
                                <TableCell>Order Date</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.order_id}>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.order_id}</TableCell>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.customer.first_name} {row.customer.last_name}</TableCell>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.customer.email}</TableCell>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.order_date}</TableCell>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.total_price}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="contained" onClick={() => handleClick(row)}>
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                
                            ))}
                           
                        </TableBody>
                    </Table>
                </TableContainer>
                }
                 
        </Paper>
    );
}

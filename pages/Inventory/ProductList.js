import { Paper, Box, Card, Grid, List, ListItem, ListItemText, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect } from "react";

import React, { useState } from "react";

export default function ProductList(){

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
                const response = await fetch('/api/inventory/query');
                const data = await response.json();
                console.log(data);
                setData(data);
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
        router.push({ pathname: `/Orders/customers/${row.transaction_id}`, query: row});
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
                                <TableCell>Product ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.customer_id}>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.product_id}</TableCell>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.name}</TableCell>
                                    <TableCell onClick={() => handleCellClick(row)}>{row.description}</TableCell>
                                </TableRow>
                                
                            ))}
                           
                        </TableBody>
                    </Table>
                </TableContainer>
                }
        </Paper>
    );
}

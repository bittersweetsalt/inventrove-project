import { Paper, Box, Menu, MenuItem, Card, Grid, List, ListItem, ListItemText, Typography, Button, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import React, { useState } from "react";

export default function ProductInfo( {  backToProductList } ){

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const [items, setItems] = useState([...]); // Your array of items here
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

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

      // Function to handle rows per page change
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper 
            sx={{
                p: 4
            }}
        >
          
        </Paper>
    );
}

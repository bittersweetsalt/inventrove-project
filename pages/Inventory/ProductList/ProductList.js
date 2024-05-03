import { Paper, Box, Menu, MenuItem, Card, Grid, List, ListItem, ListItemText, Typography, Button, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import React, { useState } from "react";

export default function ProductList( {  backToProductList } ){

    const router = useRouter();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [menuPosition, setMenuPosition] = useState(null);
    const [rowData, setRowData] = useState({});

    const handleClose = () => {
        setMenuPosition(null);
    };

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
                setData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = () =>{
        router.push({pathname: `Inventory/ProductInfo/${rowData.product_id}.js`, query: rowData});
    }   

    const handleClick = (row) => (event) => {
        setRowData(row);
        setMenuPosition({ left: event.clientX, top: event.clientY });
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
            {isLoading ? "Loading..." : ""}
            {error && <Box style={{ color: "red" }}>{error}</Box>}
            {data && 
                 <TableContainer >
                 <Table sx={{tableLayout: 'fixed'}}>
                   <TableHead>
                     <TableRow>
                       <TableCell align="left">Product ID</TableCell>
                       <TableCell align="left">Name</TableCell>
                       <TableCell align="left">Category ID</TableCell>
                       <TableCell align="left">Price</TableCell>
                       <TableCell align="left">Stock</TableCell>

                       {/* Add more table headers if needed */}
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     {/* Use slice to paginate the items array */}
                     {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(data => (
                        // <TableRow key={data.product_id} onClick={() => console.log(`Clicked row ${data.product_id}`)}>
                        <TableRow key={data.product_id} onClick={handleClick(data)}>
                            <TableCell align="left">{data.product_id}</TableCell>
                            <TableCell align="left">{data.name}</TableCell>
                            <TableCell align="left">{data.category_id}</TableCell>
                            <TableCell align="left">{data.price}</TableCell>
                            <TableCell align="left">{data.stock}</TableCell>
                        </TableRow>
                     ))}
                   </TableBody>
                 </Table>
               </TableContainer>
                }
                 {/* Pagination component */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
                    component="div"
                    count={data.length} // Total number of items
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <Menu
                    id="simple-menu"
                    anchorReference="anchorPosition"
                    anchorPosition={menuPosition}
                    keepMounted
                    open={Boolean(menuPosition)}
                    onClose={handleClose}
                >
                    {/* <MenuItem onClick={() => router.push({pathname: `Inventory/ProductInfo/${data.product_id}.js`, query: data.product_id})}>More Info</MenuItem> */}
                    <MenuItem onClick={handleRowClick}>More Info</MenuItem>
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
        </Paper>
    );
}



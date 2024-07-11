import { Paper, Box, Menu, MenuItem, Card, Grid, List, ListItem, ListItemText, Typography, Button, TablePagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { useRouter } from 'next/router';
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect } from "react";
import { styled } from '@mui/material/styles';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';

import React, { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

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
    
    const handleEditClick = () =>{
        router.push({pathname: `Inventory/ProductEdit/${rowData.product_id}.js`, query: rowData});
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
                            <StyledTableCell align="left">Product ID</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Category ID</StyledTableCell>
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="left">Stock</StyledTableCell>

                        {/* Add more table headers if needed */}
                        </TableRow>
                   </TableHead>
                   <TableBody>
                     {/* Use slice to paginate the items array */}
                     {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(data => (
                     
                        <StyledTableRow key={data.product_id} onClick={handleClick(data)}>
                            <StyledTableCell align="left">{data.product_id}</StyledTableCell>
                            <StyledTableCell align="left">{data.name}</StyledTableCell>
                            <StyledTableCell align="left">{data.category_id}</StyledTableCell>
                            <StyledTableCell align="left">{data.price}</StyledTableCell>
                            <StyledTableCell align="left">{data.stock}</StyledTableCell>
                        </StyledTableRow>
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
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
        </Paper>
    );
}



import { Paper, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button, Grid } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

// Custom colors for the color scheme
const headerColor = "#61d2ff"; // Banner color (header color)
const hoverColor = "#a8e4ff"; // Hover color
const highlightColor = "#b2dfdb"; // Highlight color (e.g., light teal)
const textColor = "#013247"; // Text color for headers

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: headerColor, // Banner color
        color: textColor, // Text color for headers
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // Remove alternating row colors
    // Add hover effect
    '&:hover': {
        backgroundColor: hoverColor, // Hover color
        cursor: "pointer", // Change cursor to pointer on hover
    },
    // Highlight selected row
    '&.Mui-selected': {
        backgroundColor: highlightColor, // Highlight color (light teal)
    },
}));

export default function OrderList() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [selectedRow, setSelectedRow] = useState(null); // State for selected row

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/orders/order_list');
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

    // Filter rows based on search query
    const filteredRows = data
        ? data.filter((row) =>
              row.order_id.toString().includes(searchQuery) ||
              row.customer.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              row.customer.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              row.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              row.order_date.includes(searchQuery) ||
              row.total_price.toString().includes(searchQuery)
          )
        : [];

    // Handle row selection
    const handleRowSelect = (row) => {
        setSelectedRow(row);
    };

    // Handle "Detail" button click
    const handleDetailClick = () => {
        router.push({ pathname: `/orders/orders/${selectedRow.order_id}` });
    };

    return (
        <Paper sx={{ p: 2 }}>
            {isLoading ? "Loading..." : ""}
            {error && <Box style={{ color: "red" }}>{error}</Box>}

            {/* Search Bar */}
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {data && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Order ID</StyledTableCell>
                                <StyledTableCell>Customer Name</StyledTableCell>
                                <StyledTableCell>Customer Email</StyledTableCell>
                                <StyledTableCell>Order Date</StyledTableCell>
                                <StyledTableCell>Amount</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <StyledTableRow
                                    key={row.order_id}
                                    onClick={() => handleRowSelect(row)}
                                    selected={selectedRow?.order_id === row.order_id} // Highlight selected row
                                >
                                    <StyledTableCell>{row.order_id}</StyledTableCell>
                                    <StyledTableCell>{row.customer.first_name} {row.customer.last_name}</StyledTableCell>
                                    <StyledTableCell>{row.customer.email}</StyledTableCell>
                                    <StyledTableCell>{row.order_date}</StyledTableCell>
                                    <StyledTableCell>${row.total_price.toFixed(2)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Display Selected Row Details */}
            {selectedRow && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Selected Order Details
                    </Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            {/* Order Details */}
                            <Grid item xs={12} sm={8}>
                                <Typography variant="body1">
                                    <strong>Order ID:</strong> {selectedRow.order_id}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Customer Name:</strong> {selectedRow.customer.first_name} {selectedRow.customer.last_name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Customer Email:</strong> {selectedRow.customer.email}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Order Date:</strong> {selectedRow.order_date}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Total Price:</strong> ${selectedRow.total_price.toFixed(2)}
                                </Typography>
                            </Grid>

                            {/* "Detail" Button */}
                            <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleDetailClick}
                                >
                                    Detail
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            )}
        </Paper>
    );
}
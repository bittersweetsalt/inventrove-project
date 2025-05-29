import { 
  Paper, 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Typography, 
  Button, 
  Grid,
  TablePagination
} from "@mui/material";
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

export default function TransactionList() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [selectedRow, setSelectedRow] = useState(null); // State for selected row
    
    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/orders/transaction_list');
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
              row.transaction_id.toString().includes(searchQuery) ||
              row.buyer.buyer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              row.seller.seller_name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    // Pagination calculations
    const paginatedRows = filteredRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Handle row selection
    const handleRowSelect = (row) => {
        setSelectedRow(row);
    };

    // Handle "Detail" button click
    const handleDetailClick = () => {
        router.push({ pathname: `/orders/transactions/${selectedRow.transaction_id}` });
    };

    return (
        <Paper sx={{ p: 2 }}>
            {isLoading ? "Loading..." : ""}
            {error && <Box style={{ color: "red" }}>{error}</Box>}

            {/* Search Bar */}
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setPage(0); // Reset to first page when searching
                }}
                sx={{ marginBottom: 2 }}
            />

            {data && (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Transaction ID</StyledTableCell>
                                    <StyledTableCell>Order ID</StyledTableCell>
                                    <StyledTableCell>Buyer Name</StyledTableCell>
                                    <StyledTableCell>Seller Name</StyledTableCell>
                                    <StyledTableCell>Transaction Date</StyledTableCell>
                                    <StyledTableCell>Amount</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedRows.map((row) => (
                                    <StyledTableRow
                                        key={row.transaction_id}
                                        onClick={() => handleRowSelect(row)}
                                        selected={selectedRow?.transaction_id === row.transaction_id} // Highlight selected row
                                    >
                                        <StyledTableCell>{row.transaction_id}</StyledTableCell>
                                        <StyledTableCell>{row.order_id}</StyledTableCell>
                                        <StyledTableCell>{row.buyer.buyer_name}</StyledTableCell>
                                        <StyledTableCell>{row.seller.seller_name}</StyledTableCell>
                                        <StyledTableCell>{row.transaction_date}</StyledTableCell>
                                        <StyledTableCell>${row.amount.toFixed(2)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {/* TablePagination */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => {
                                setPage(newPage);
                                setSelectedRow(null); // Clear selection when changing pages
                            }}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0); // Reset to first page when changing rows per page
                            }}
                        />
                    </TableContainer>
                </>
            )}

            {/* Display Selected Row Details */}
            {selectedRow && (
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Selected Transaction Details
                    </Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            {/* Transaction Details */}
                            <Grid item xs={12} sm={8}>
                                <Typography variant="body1">
                                    <strong>Transaction ID:</strong> {selectedRow.transaction_id}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Order ID:</strong> {selectedRow.order_id}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Buyer Name:</strong> {selectedRow.buyer.buyer_name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Seller Name:</strong> {selectedRow.seller.seller_name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Transaction Date:</strong> {selectedRow.transaction_date}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Amount:</strong> ${selectedRow.amount.toFixed(2)}
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
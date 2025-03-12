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

export default function BuyerList() {
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
                const response = await fetch('/api/orders/buyer_list');
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
              row.buyer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              row.phone_number.includes(searchQuery) ||
              row.shipping_address.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    // Handle row selection
    const handleRowSelect = (row) => {
        setSelectedRow(row);
    };

    // Handle "Detail" button click
    const handleDetailClick = () => {
        router.push({ pathname: `/orders/buyers/${selectedRow.buyer_id}` });
    };

    return (
        <Paper sx={{ p: 2 }}>
            {isLoading ? "Loading..." : ""}
            {error && <Box style={{ color: "red" }}>{error}</Box>}

            {/* Search Bar */}
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search buyers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ marginBottom: 2 }}
            />

            {data && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Buyer's Name</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Phone Number</StyledTableCell>
                                <StyledTableCell>Shipping Address</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.map((row) => (
                                <StyledTableRow
                                    key={row.buyer_id}
                                    onClick={() => handleRowSelect(row)}
                                    selected={selectedRow?.buyer_id === row.buyer_id} // Highlight selected row
                                >
                                    <StyledTableCell>{row.buyer_name}</StyledTableCell>
                                    <StyledTableCell>{row.email}</StyledTableCell>
                                    <StyledTableCell>{row.phone_number}</StyledTableCell>
                                    <StyledTableCell>{row.shipping_address}</StyledTableCell>
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
                        Selected Buyer Details
                    </Typography>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Grid container spacing={2}>
                            {/* Buyer Details */}
                            <Grid item xs={12} sm={8}>
                                <Typography variant="body1">
                                    <strong>Buyer Name:</strong> {selectedRow.buyer_name}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Email:</strong> {selectedRow.email}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Phone Number:</strong> {selectedRow.phone_number}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Shipping Address:</strong> {selectedRow.shipping_address}
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
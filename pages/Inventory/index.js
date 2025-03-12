import {
    Paper,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    Button,
    TablePagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    styled,
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../component/layout";

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
    "&:hover": {
        backgroundColor: hoverColor, // Hover color
        cursor: "pointer", // Change cursor to pointer on hover
    },
    // Highlight selected row
    "&.Mui-selected": {
        backgroundColor: highlightColor, // Highlight color (light teal)
    },
}));

const DeleteButton = styled(Button)({
    backgroundColor: "#FF7373", // Background color
    color: "#FFFFFF", // Text color
    "&:hover": {
        backgroundColor: "#FF8A80", // Hover background color
        color: "#000000", // Hover text color
    },
});

export default function Inventory({ initialData }) {
    const router = useRouter();
    const [data, setData] = useState(initialData); // Use initialData from props
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [selectedRow, setSelectedRow] = useState(null); // State for selected row
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Function to handle "Add Item" button click
    const addItem = () => {
        router.push({ pathname: `inventory/productadd` });
    };

    // Filter rows based on search query
    const filteredRows = data
        ? data.filter(
              (row) =>
                  row.product_id.toString().includes(searchQuery) ||
                  row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  row.category_id.toString().includes(searchQuery) ||
                  row.price.toString().includes(searchQuery) ||
                  row.stock.toString().includes(searchQuery)
          )
        : [];

    // Handle row selection
    const handleRowSelect = (row) => {
        setSelectedRow(row);
    };

    // Handle row click (for navigation or actions)
    const handleRowClick = (row) => {
        router.push({
            pathname: `inventory/productinfo/${row.product_id}`,
            query: row,
        });
    };

    // Handle edit click
    const handleEditClick = (row) => {
        router.push({
            pathname: `inventory/productedit/${row.product_id}`,
            query: row,
        });
    };

    // Handle delete confirmation dialog open
    const handleDeleteDiagOpen = () => {
        setDeleteConfirm(true);
    };

    // Handle delete confirmation dialog close
    const handleDeleteDiagClose = () => {
        setDeleteConfirm(false);
    };

    // Handle delete item
    const deleteItem = async () => {
        if (!selectedRow) return;

        try {
            // Delete the item from the API
            const response = await fetch(
                `/api/inventory/delete?id=${selectedRow.product_id}`,
                {
                    method: "DELETE",
                }
            );
            console.log(response);

            // Refetch data after deletion
            const updatedResponse = await fetch("/api/inventory/query");
            const updatedData = await updatedResponse.json();
            setData(updatedData); // Update the data state
        } catch (error) {
            console.error("Error deleting item:", error);
        } finally {
            setDeleteConfirm(false); // Close the delete confirmation dialog
        }
    };

    return (
        <Layout>
            <Grid
                container
                spacing={0}
                sx={{
                    width: "100%",
                    margin: 0,
                    padding: 0,
                }}
            >
                {/* Button Row */}
                <Grid
                    container
                    justifyContent="flex-end"
                    sx={{
                        width: "100%",
                        margin: 0,
                        padding: 0,
                        pb: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addItem}
                    >
                        Add Item
                    </Button>
                </Grid>

                {/* Table Row */}
                <Grid
                    item
                    xs={12}
                    sx={{
                        width: "100%",
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Paper sx={{ p: 2 }}>
                        {/* Search Bar */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />

                        {data && (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="left">
                                                Product ID
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                Name
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                Category ID
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                Price
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                Stock
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {filteredRows
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => (
                                                <StyledTableRow
                                                    key={row.product_id}
                                                    onClick={() =>
                                                        handleRowSelect(row)
                                                    }
                                                    selected={
                                                        selectedRow?.product_id ===
                                                        row.product_id
                                                    }
                                                >
                                                    <StyledTableCell align="left">
                                                        {row.product_id}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {row.category_id}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {row.price}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="left">
                                                        {row.stock}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        {/* Pagination */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={filteredRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(parseInt(event.target.value, 10));
                                setPage(0);
                            }}
                        />

                        {/* Selected Row Details */}
                        {selectedRow && (
                            <Box sx={{ marginTop: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Selected Product Details
                                </Typography>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={8}>
                                            <Typography variant="body1">
                                                <strong>Product ID:</strong>{" "}
                                                {selectedRow.product_id}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Name:</strong>{" "}
                                                {selectedRow.name}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Category ID:</strong>{" "}
                                                {selectedRow.category_id}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Price:</strong>{" "}
                                                {selectedRow.price}
                                            </Typography>
                                            <Typography variant="body1">
                                                <strong>Stock:</strong>{" "}
                                                {selectedRow.stock}
                                            </Typography>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={4}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                gap: 2,
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    handleRowClick(selectedRow)
                                                }
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() =>
                                                    handleEditClick(selectedRow)
                                                }
                                            >
                                                Edit
                                            </Button>
                                            <DeleteButton
                                                variant="contained"
                                                onClick={handleDeleteDiagOpen}
                                            >
                                                Delete
                                            </DeleteButton>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        )}

                        {/* Delete Confirmation Dialog */}
                        <Dialog
                            open={deleteConfirm}
                            onClose={handleDeleteDiagClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                Delete Confirmation
                            </DialogTitle>
                            <DialogContent>
                                <Typography>
                                    Are you sure you want to delete this item?
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        gap: 2,
                                        mt: 2,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={deleteItem}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleDeleteDiagClose}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </DialogContent>
                        </Dialog>
                    </Paper>
                </Grid>
            </Grid>
        </Layout>
    );
}

// Fetch data on the server side
export async function getServerSideProps() {
    try {
        const res = await fetch("http://localhost:3000/api/inventory/query"); // Adjust the URL as needed
        const initialData = await res.json();
        return {
            props: { initialData }, // Pass data to the page as props
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: { initialData: [] }, // Return empty data in case of error
        };
    }
}
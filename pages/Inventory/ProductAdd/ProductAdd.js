import { Paper, TextField, Box, Card, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, SimpleDialog, List, ListItem, ListItemText, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect } from "react";
// import { createTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from '@mui/system';
import React, { useState } from "react";

export default function ProductAdd( {backToProductList} ){

    const router = useRouter();

    const [formInputData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        price: '',      
        stock: '',
    });
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [errorResponse, setResponseErrors] = useState(false);
    const [errorResponseText, setErrorResponseText] = useState();
    const [postReady, setPostReady] = useState(false);

    // File Uploader
    const [selectedFile, setSelectedFile] = useState(null);

   
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleNewEntrySubmit = async (event) => {
        event.preventDefault();
        for (const value in errors) {
            if(errors[value] == true){
                setPostReady(false);
                setErrorResponseText("Error: Status - An input is not allowed. Please try again");
                handleErrorResponseOpen();
            }
            if(errors[value] == false){
                setPostReady(true);
            }
        }
        if(postReady){
            if (!selectedFile) return;

            // Send the selected file to your Next.js API route for upload
            const formData = new FormData();
            formData.append('image', selectedFile);
            formData.append('formData', formInputData);

            const response = await fetch('/api/minio/upload/newProductEntry', {
                method: 'POST',
                body: formData,
            });

            // const data = await response.json();
            // Handle success or error messages from the API route
            if(response.status == 200){
                handleClose();
            }
            if(response.status != 200){
                handleErrorResponseOpen();
                setErrorResponseText("Error: Status " + response.status + " - " + response.statusText);
            }
        }       
    };

    const handleStringVali_Insert = (e) => {
        const validationError = validateStrings(e.target.value);
        if (validationError){
            setErrors({
                ...errors,
                [e.target.name]: true,
            });
        }
        else{
            setErrors({
                ...errors,
                [e.target.name]: false,
            });
        }
        setFormData({
            ...formInputData,
            [e.target.name]: e.target.value 
        });
    };

    const handleNumberVali_Insert = (e) => {
        const validationError = validateNumber(e.target.value);
        if (validationError){
            setErrors({
                ...errors,
                [e.target.name]: true,
            });
        }
        else{
            setErrors({
                ...errors,
                [e.target.name]: false,
            });
        }
        setFormData({
            ...formInputData,
            [e.target.name]: e.target.value 
        });
      };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleErrorResponseOpen = () =>{
        setResponseErrors(true);
    };
    
    const handleErrorResponseClose = () =>{
        setResponseErrors(false);
        setErrorResponseText('')
    };


    const validateStrings = (value) => {
        const strings = /^[a-zA-Z0-9_.-]+$/; // Allows letters, numbers, ., -, and _
        return !strings.test(value);
    };

    const validateNumber = (value) => {        
        const floatRegex = /^[+-]?\d+(\.\d+)?$/;
        const test_results = !floatRegex.test(value);
        return test_results
    };

    return (
        <Grid  
            container
            justifyContent="center"
        >
            <Grid
                item
                xs={12} sm={6} md={4}
                sx={{pt: 4}}
            >
                <Card 
                    sx={{
                        p:2,
                        borderRadius:2
                    }}
                >                        
                    <Box sx={{ '& > :not(style)': { marginBottom: 2 } }}>
                        <Grid
                            container
                            spacing={2}
                        >
                            <Grid
                                item    
                                xs={12}
                            >
                                <Box
                                    elevation={0}
                                    sx={{
                                        height: '20vh',
                                        border: 2,
                                        borderColor: 'primary.main'
                                    }}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems={"center"}
                                    justifyContent={'center'}
                                    borderRadius='8px'
                                >
                                    <Typography>
                                        Upload Image
                                    </Typography>
                                    
                                        <input type="file" name="image" onChange={handleFileChange} />
                                        <Button >Upload Image</Button>
                                    
                                    </Box>
                            </Grid>
                            <Grid
                                item    
                                xs={4}
                            >
                                <TextField
                                    id="outlined-required"
                                    name="name"
                                    label="Name"
                                    value={formInputData.name}
                                    onChange={handleStringVali_Insert}
                                    error={errors.name} 
                                    required
                                    fullWidth
                                />
                            </Grid>

                            <Grid
                                item  
                                xs={8}  
                            >
                                <TextField
                                    id="outlined-required"
                                    name="category_id"
                                    label="Category ID"
                                    rows={4}
                                    value={formInputData.category_id}
                                    onChange={handleStringVali_Insert}
                                    error={errors.category_id} 
                                    required
                                    fullWidth
                                />
                            </Grid>                                                                                                  

                            <Grid
                                item 
                                xs={12}
                            >
                                <TextField
                                    id="outlined-required"
                                    name="description"
                                    label="Description"
                                    value={formInputData.description}
                                    onChange={handleStringVali_Insert}
                                    multiline
                                    rows={4}
                                    error={errors.description} 
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    id="outlined-required"
                                    name="price"
                                    label="Price"
                                    value={formInputData.price}
                                    onChange={handleNumberVali_Insert}
                                    error={errors.price} 
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    id="outlined-required"
                                    name="stock"
                                    label="Stock"
                                    value={formInputData.stock}
                                    onChange={handleNumberVali_Insert}
                                    error={errors.stock} 
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                container
                                justifyContent="flex-end"
                                spacing={2}
                            >
                                <Grid
                                    item
                                >
                                    <Button onClick={handleClickOpen} variant="contained" color="primary">
                                        Submit
                                    </Button>
                                </Grid>
                                
                                <Grid
                                    item
                                >
                                    <Button onClick={backToProductList} variant="outlined" color="primary">
                                        Back
                                    </Button>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Box>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Adding Item Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Confirming Adding Item?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        {/* <Button onClick={handleConfirmation} type="submit" variant="contained" color="primary" autoFocus>Submit</Button> */}
                        <Button onClick={handleNewEntrySubmit} variant="contained" color="primary" autoFocus>Submit</Button>
                        <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                    
                    { 
                        errorResponse ? (
                            <Dialog
                                open={open}
                                onClose={handleErrorResponseClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                {"Something happened during the adding of the product!"}
                                </DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {errorResponseText}
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                {/* <Button onClick={handleConfirmation} type="submit" variant="contained" color="primary" autoFocus>Submit</Button> */}
                                <Button onClick={handleClose}>Close</Button>
                                </DialogActions>
                            </Dialog>
                        ) : (
                            <div></div>
                        )
                    }
                </Card>
            </Grid>
        </Grid>
    );
}
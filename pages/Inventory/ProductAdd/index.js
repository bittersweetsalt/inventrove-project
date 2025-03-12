import { Paper, Input, TextField, Box, Card, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Button, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect } from "react";
// import { createTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from '@mui/system';
import React, { useState } from "react";
import Timer from "../../../component/timer/timer";
import Layout from "../../../component/layout";

export default function ProductAdd( {backProductList} ){

    const router = useRouter();

    const [formInputData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        price: '',      
        stock: '',
        image_path: ''
    });
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [redirectTimer, setRedirectTimer] = useState(5);
    const [errorResponse, setResponseErrors] = useState(false);
    const [errorResponseText, setErrorResponseText] = useState();
    const [postReady, setPostReady] = useState(false);

    // File Uploader
    const [selectedFile, setSelectedFiles] = useState([]);

   
    const handleFileChange = (event) => {
        // setSelectedFile([...selectedFile, event.target.files[0]]);
        if (event.target.files) {
            // Create an array from the file list
            const fileArray = Array.from(event.target.files);
            console.log(event.target.files[0])
            // Update the state to include the new files
            setSelectedFiles(prevFiles => [...prevFiles, ...fileArray]);
        }
    };
    console.log(selectedFile)
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

            try {
                const formData = new FormData();
                selectedFile.forEach((imageFile) => {
                  formData.append(`images`, imageFile);
                });
                
                const response = await fetch('/api/minio/upload/newProductEntry', {
                  method: 'POST',
                  body: formData,
                });
              
                if (!response.ok) {
                  throw new Error('Minio Network response was not ok');
                }
              
                const data = await response.json();
                
                setFormData({
                  ...formInputData,
                  image_path: data.productNumber,
                });
              
                const insert_payload = {
                  name: formInputData.name,
                  description: formInputData.description,
                  category_id: parseInt(formInputData.category_id),
                  price: parseInt(formInputData.price),
                  stock: parseInt(formInputData.stock),
                  image_path: data.productNumber.toString(),
                };
              
                const response_postresql = await fetch('/api/inventory/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(insert_payload),
                });
              
                await response_postresql.json();
                if (response_postresql.status === 200) {
                  console.log('Item Created successfully');
                  // set the success page
                  handleSubmissionResponseOpen();
                //   backToProductList();
                } else {
                  console.error('Failed to create Item');
                  handleErrorResponseOpen();
                  setErrorResponseText("Error: Status " + response_postresql.status + " - " + response_postresql.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                // Handle the error as needed (e.g., show an error message to the user)
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

    const handleSubmissionResponseOpen = () =>{
        setSubmitSuccess(true);
    };

    const handleSubmissionResponseClose = (event, reason) =>{
        if (reason && reason === "backdropClick") 
            return;
        setSubmitSuccess(false);        

        myCloseModal();
    };

    const handleDropDown = (e) =>{
        setFormData({
            ...formInputData,
            [e.target.name]: e.target.value 
        });
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

    const handleBack = () =>{
        router.push({pathname: `/inventory`});
    }


    return (
        <Layout>
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
                                    alignItems="center"
                                    justifyContent='center'
                                    borderRadius='8px'
                                    >
                                    <Typography>
                                        Upload Image
                                    </Typography>

                                    {selectedFile && selectedFile.length > 0 ? (
                                        selectedFile.map((file, index) => (
                                        <Typography key={index}>
                                            {file.name}
                                        </Typography>
                                        ))
                                    ) : (
                                        <Typography>No files selected.</Typography>
                                    )}

                                        {/* <label htmlFor="raised-button-file">
                                            <Input
                                                accept="image/*"
                                                style={{ display: 'block' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                                name="image"
                                                onChange={handleFileChange}
                                            />
                                                <Button variant="contained" component="span">
                                                    Upload
                                                </Button>
                                        </label> */}
                                        <form >
                                            <input type="file" multiple onChange={handleFileChange} />
                                            <button type="submit">Upload</button>
                                        </form>     
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
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category ID</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="category_id"
                                            value={formInputData.category_id}
                                            required
                                            label="Category ID"
                                            onChange={handleDropDown}
                                            >
                                            <MenuItem value={1}>Electronics</MenuItem>
                                            <MenuItem value={2}>Household Items</MenuItem>
                                            <MenuItem value={3}>Car Parts</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
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
                                    <Button onClick={handleBack} variant="outlined" color="primary">
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
                                open={errorResponse}
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
                    { 
                        submitSuccess ? (
                            <Dialog
                                open={submitSuccess}
                                onClose={handleSubmissionResponseClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Product Successfully Created"}
                                </DialogTitle>
                                <DialogContent>
                                    <Timer backToProductList={backProductList} message={"Page will redirect itself to the previous page in "}></Timer>
                                </DialogContent>
                            </Dialog>
                        ) : (
                            <div></div>
                        )
                    }
                </Card>
            </Grid>
        </Grid>
        </Layout>
    );
}

import { Paper, Input, TextField, Box, Card, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, Button, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect } from "react";
// import { createTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from '@mui/system';
import React, { useState } from "react";
import Timer from "../../../PagesComponent/timer/timer";

export default function ProductEdit({ itemQuery }){

    const router = useRouter();

    const [query_id, setQueryId] = useState(0);
    const { product_id, name, description, category_id, price, stock, minio_image_path } = router.query;
    const [productData, setProductData] = useState(router.query)
    const [errors, setErrors] = useState({});

    const [formInputData, setFormData] = useState({
        name: '',
        description: '',
        category_id: '',
        price: '',      
        stock: '',
        image_path: ''
    });

    const [blobUrls, setBlobUrls] = useState([]);

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


      const validateStrings = (value) => {
        const strings = /^[a-zA-Z0-9_.-]+$/; // Allows letters, numbers, ., -, and _
        return !strings.test(value);
    };

    const validateNumber = (value) => {        
        const floatRegex = /^[+-]?\d+(\.\d+)?$/;
        const test_results = !floatRegex.test(value);
        return test_results
    };

    const handleDropDown = (e) =>{
        setFormData({
            ...formInputData,
            [e.target.name]: e.target.value 
        });
    };

    const handleInputChange = (event) => {
        console.log(productData);
    }

    const handleBack = () =>{
        router.push({pathname: `/Inventory`});
    }
    
   

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

                                
                            </Grid>
                        </Grid>
                    </Box>
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
                            <Button variant="contained" color="primary">
                                Update
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
                </Card>
            </Grid>
        </Grid>
    );
}

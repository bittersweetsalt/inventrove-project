
import { Paper, Input, TextField, Box, Card, Grid, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ImageList, ImageListItem, Typography, Button, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useRouter } from 'next/router';
import { useEffect } from "react";
// import { createTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from '@mui/system';
import React, { useState } from "react";
import Timer from "../../../PagesComponent/timer/timer";
import ImageCard from "./imageControl/imageComponent";

export default function ProductEdit({ itemQuery }){

    const router = useRouter();
    const { product_id, name, description, category_id, price, stock, minio_image_path } = router.query;

    const [productData, setProductData] = useState(router.query)
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [blobUrls, setBlobUrls] = useState([]);
    
    const [postData, setPostData] = useState({});

    // File Uploader
    const [selectedFile, setSelectedFiles] = useState([]);

    const [postReady, setPostReady] = useState(false);


    const handleFileChange = (event) => {
        if (event.target.files) {
            // Create an array from the file list
            const fileArray = Array.from(event.target.files);

            const blobUrls = fileArray.map(file => {
                const blob = new Blob([file], { type: file.type });
                
                return {blob, file}
            });
            
            setBlobUrls(prevUrls => [...prevUrls, ...blobUrls])
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
        setPostData({
            ...postData,
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
        setPostData({
            ...postData,
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
        setPostData({
            ...postData,
            [e.target.name]: e.target.value 
        });
    };

    const handleBack = () =>{
        blobUrls.forEach(blobUrl => {
            URL.revokeObjectURL(blobUrl);
        });
        router.push({pathname: `/Inventory`});
    }

    useEffect(() => {
        const query_payload = {
            query_id: product_id
        }
       
        const fetchInfoData = async () => {
            try {
                const response = await fetch('/api/product/product_query', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query_payload)
                });
                const data = await response.json();
                setPostData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInfoData();
    }, []);

    useEffect(() =>{
        const query_payload = {
            query_id: product_id,
            minio_image_path: minio_image_path
        }
        const fetchImageData = async () => {
            try {
                const initialResponse  = await fetch('/api/minio/query/imageQuery', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(query_payload)
                });
                const minioImageList  = await initialResponse.json();

                try{
                    const promises = minioImageList.map(async (item) => {
                        const response = await fetch(`/api/minio/query/minioImageQuery`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(item)
                        });
                        // console.log(response.headers)
                        const headers = {};
                        response.headers.forEach((value, key) => {
                            headers[key] = value;
                        });
                        const blob = await response.blob();

                        // return response.blob();
                        return { headers, blob }
                    });
                    
                    // Wait for all promises to resolve
                    const responses = await Promise.all(promises);

                    // Resolve all blobs and adding them into blobUrls hook
                    const blobsWithHeaders = responses.map(response => ({
                        blob: new Blob([response.blob], { type: 'image/jpeg' }),
                        headers: response.headers
                    }));
                    setBlobUrls(blobsWithHeaders)
                } catch (error) {
                console.error('An error occurred:', error);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImageData();
    }, [])

    const handleEditEntrySubmit = async (event) => {
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
                // const formData = new FormData();
                // selectedFile.forEach((imageFile) => {
                //   formData.append(`images`, imageFile);
                // });
                
                // const response = await fetch('/api/minio/upload/editProductEntry', {
                //   method: 'POST',
                //   body: formData,
                // });
              
                // if (!response.ok) {
                //   throw new Error('Minio Network response was not ok');
                // }
              
                // const data = await response.json();
                
                // setPostData({
                //   ...postData,
                //   image_path: data.productNumber,
                // });
              
                const insert_payload = {
                    product_id: product_id,
                    name: postData.name,
                    description: postData.description,
                    category_id: parseInt(postData.category_id),
                    price: parseInt(postData.price),
                    stock: parseInt(postData.stock),
                };
              
                const response_postresql = await fetch('/api/inventory/update', {
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
                //   handleSubmissionResponseOpen();
                //   backToProductList();
                } else {
                  console.error('Failed to create Item');
                //   handleErrorResponseOpen();
                //   setErrorResponseText("Error: Status " + response_postresql.status + " - " + response_postresql.statusText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                // Handle the error as needed (e.g., show an error message to the user)
            }
        }       
    };

    const removeImageBlob = (e, imageUrl) =>{
        console.log(imageUrl)
        blobUrls.forEach(blobUrl => {
            if (imageUrl === blobUrl){
                URL.revokeObjectURL(blobUrl);
            }
        });
        const newBlobUrl = blobUrls.filter(item => item !== imageUrl)
        setBlobUrls(newBlobUrl)
        console.log(blobUrls)
    }

    return (

        <Grid  
            container
            justifyContent="center"
        >
            <Card 
                    sx={{
                        p:2,
                        borderRadius:2
                    }}
                >      
                    <Grid
                        item
                        xs={12}
                        container
                        justifyContent="flex-end"
                        spacing={2}
                    >
                        <Grid
                            container
                        >
                            <Grid
                                item
                                xs={12} sm={8} md={8}
                            >
                                <Box>
                                    {/* <ImageController product_id={product_id} minio_image_path={minio_image_path}></ImageController> */}
                                    <Card>
                                        {
                                        isLoading ? (
                                            <div></div>
                                        ): (
                                        <Grid container spacing={2} justifyContent="center" alignItems="center" >
                                            <Grid item >
                                                {blobUrls ?
                                                    <ImageList rowHeight={200}>
                                                        {blobUrls.map((url, index) => (
                                                            <ImageListItem key={index} sx={{border: '1px solid lightgrey', borderRadius: 1}}>
                                                                <ImageCard imageUrl={url} removeImageBlob={removeImageBlob} />
                                                            </ImageListItem>
                                                        ))}
                                                    </ImageList>: <div>
                                                        Loading Images
                                                    </div>
                                                }
                                            </Grid>
                                        </Grid>
                                        )}
                                    </Card>
                                </Box>
                                
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
                                            {/* <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100px', height: '100px' }} /> */}
                                        </Typography>
                                        ))
                                    ) : (
                                        <Typography>No files selected.</Typography>
                                    )}
                                        <form >
                                            <input type="file" multiple onChange={handleFileChange} />
                                        </form>     
                                </Box> 
                            </Grid>
                        
                            <Grid
                                item
                                xs={12} sm={4} md={4}

                            >
                                <Box sx={{ padding: 2}}>
                                    <Grid
                                        container
                                        spacing={2}
                                    >
                                        <Grid
                                            item 
                                            xs={12} sm={6} md={6}
 
                                        >
                                            <TextField
                                                id="outlined-required"
                                                name="name"
                                                label="Name"
                                                value={postData.name || ""}
                                                onChange={handleStringVali_Insert}
                                                error={errors.name} 
                                                required
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Grid>

                                        <Grid
                                            item  
                                            xs={12} sm={6} md={6}

                                        >
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Category ID</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        name="category_id"
                                                        required
                                                        value={postData.category_id || ""}
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
                                                value={postData.description || ""}
                                                onChange={handleStringVali_Insert}
                                                multiline
                                                rows={4}
                                                error={errors.description} 
                                                required
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
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
                                                value={postData.price || ""}
                                                onChange={handleNumberVali_Insert}
                                                error={errors.price} 
                                                required
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
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
                                                value={postData.stock || ""}
                                                onChange={handleNumberVali_Insert}
                                                error={errors.stock} 
                                                required
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                  }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid> 
                        </Grid>
                             
                        <Grid
                            item
                        >
                            <Button onClick={handleEditEntrySubmit} variant="contained" color="primary">
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
    );
}

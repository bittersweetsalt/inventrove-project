

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import {
//     Paper,
//     Divider,
//     TextField,
//     Box,
//     Card,
//     Grid,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogContentText,
//     DialogActions,
//     ImageList,
//     ImageListItem,
//     Typography,
//     Button,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     CircularProgress,
//     Snackbar,
//     Alert,
// } from "@mui/material";
// import Timer from "../../../component/timer/timer";
// import ImageCard from "./imagecontrol/imagecard";
// import ImageGrid from "./imagecontrol/imagegrid";
// import validateNumber from "../../../component/validators/num_validation";
// import validateStrings from "../../../component/validators/string_validation";

// export default function ProductEdit() {
//     const router = useRouter();
//     const { product_id, name, description, category_id, price, stock, minio_image_path } = router.query;

//     // State Management
//     const [errors, setErrors] = useState({});
//     const [isLoading, setIsLoading] = useState(false);
//     const [blobUrls, setBlobUrls] = useState([]);
//     const [postData, setPostData] = useState({});
//     const [imageRemove, setImageRemove] = useState([]);
//     const [selectedFile, setSelectedFiles] = useState([]);
//     const [selFileToMinio, setSelFileToMinio] = useState([]);
//     const [postReady, setPostReady] = useState(true);

//     // Notifications
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//     // Dialog States
//     const [open, setOpen] = useState(false);

//     // Fetch Product Data
//     useEffect(() => {
//         const fetchInfoData = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await fetch("/api/product/product_query", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ query_id: product_id }),
//                 });
//                 const data = await response.json();
//                 setPostData(data);
//             } catch (error) {
//                 showSnackbar("Failed to fetch product data", "error");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchInfoData();
//     }, [product_id]);

//     // Fetch Image Data
//     useEffect(() => {
//         const fetchImageData = async () => {
//             setIsLoading(true);
//             try {
//                 const response = await fetch("/api/minio/query/imageQuery", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify({ query_id: product_id, minio_image_path }),
//                 });
//                 const minioImageList = await response.json();

//                 const promises = minioImageList.map(async (item) => {
//                     const imageResponse = await fetch("/api/minio/query/minioImageQuery", {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                         body: JSON.stringify(item),
//                     });
//                     const blob = await imageResponse.blob();
//                     return { headers: item, blob };
//                 });

//                 const responses = await Promise.all(promises);
//                 setBlobUrls(responses);
//             } catch (error) {
//                 showSnackbar("Failed to fetch images", "error");
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchImageData();
//     }, [product_id, minio_image_path]);

//     // Handle File Upload
//     const handleFileChange = (event) => {
//         if (event.target.files) {
//             const fileArray = Array.from(event.target.files);
//             const blobUrls = fileArray.map((file) => {
//                 const blob = new Blob([file], { type: file.type });
//                 return { blob, file };
//             });
//             setSelFileToMinio((prev) => [...prev, ...fileArray]);
//             setSelectedFiles((prev) => [...prev, ...blobUrls]);
//         }
//     };

//     // Handle Form Input Changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         let validationError = false;

//         if (name === "name" || name === "description") {
//             validationError = validateStrings(value);
//         } else if (name === "price" || name === "stock") {
//             validationError = validateNumber(value);
//         }

//         setErrors((prev) => ({ ...prev, [name]: validationError }));
//         setPostData((prev) => ({ ...prev, [name]: value }));
//     };

//     // Handle Dropdown Changes
//     const handleDropDown = (e) => {
//         setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     // Handle Back Navigation
//     const handleBack = () => {
//         blobUrls.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
//         router.push("/inventory");
//     };

//     // Handle Edit Submission
//     const handleEditEntrySubmit = async () => {
//         try {
//             if (imageRemove.length > 0) {
//                 await fetch("/api/minio/remove/imageRemove", {
//                     method: "POST",
//                     body: JSON.stringify(imageRemove),
//                 });
//             }

//             if (selFileToMinio.length > 0) {
//                 const formData = new FormData();
//                 formData.append("minio_imagepath", minio_image_path);
//                 selFileToMinio.forEach((file) => formData.append("images", file));

//                 await fetch("/api/minio/edit/imageEdit", {
//                     method: "POST",
//                     body: formData,
//                 });
//             }

//             const insert_payload = {
//                 product_id,
//                 name: postData.name,
//                 description: postData.description,
//                 category_id: parseInt(postData.category_id),
//                 price: parseInt(postData.price),
//                 stock: parseInt(postData.stock),
//             };

//             const response = await fetch("/api/inventory/update", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(insert_payload),
//             });

//             if (response.ok) {
//                 showSnackbar("Product updated successfully", "success");
//                 setTimeout(() => router.push("/inventory"), 2000);
//             } else {
//                 showSnackbar("Failed to update product", "error");
//             }
//         } catch (error) {
//             showSnackbar("An error occurred while updating the product", "error");
//         }
//     };

//     // Remove Image
//     const removeImageBlob = (event, imageUrl) => {
//         // console.log("remove item: ", imageUrl)
//         // console.log("remove item: ", event)
//         // console.log(blobUrls)
//         setBlobUrls((prev) => prev.filter((item) => item !== imageUrl));
//         setSelectedFiles((prev) => prev.filter((item) => item !== imageUrl));
//         setImageRemove((prev) => [...prev, imageUrl]);
//     };

//     // Snackbar Notification
//     const showSnackbar = (message, severity) => {
//         setSnackbarMessage(message);
//         setSnackbarSeverity(severity);
//         setSnackbarOpen(true);
//     };

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     return (
//         <Grid container justifyContent="center" spacing={2} sx={{ pt: 2, pl: 2, width: "100%" }}>
//             <Grid item>
//                 <Card sx={{ p: 2, borderRadius: 2 }}>
//                     <Grid container spacing={2} justifyContent="flex-end">
//                         {/* Image Section */}
//                         <Grid item xs={12} sm={8} md={8}>
//                             {isLoading ? (
//                                 <CircularProgress />
//                             ) : (
//                                 <Grid container spacing={2} sx={{ pt: 2 }} justifyContent="center" alignItems="center" direction="column">
//                                     <Grid item>
//                                         <Divider>Image on File</Divider>
//                                         <ImageGrid blobUrls={blobUrls} removeImageBlob={removeImageBlob} />
//                                     </Grid>
//                                     <Grid item>
//                                         <Divider>Image to Upload</Divider>
//                                         <ImageList cols={3} rowHeight={200}>
//                                             {selectedFile.map((url, index) => (
//                                                 <ImageListItem key={index} sx={{ border: "1px solid lightgrey", borderRadius: 1 }}>
//                                                     <ImageCard imageUrl={url} removeImageBlob={removeImageBlob} />
//                                                 </ImageListItem>
//                                             ))}
//                                             <Button
//                                                 sx={{
//                                                     height: 200,
//                                                     width: 300,
//                                                     borderRadius: 2,
//                                                     border: 3,
//                                                     borderColor: "gray",
//                                                     bgcolor: "lightgray",
//                                                     "&:hover": {
//                                                         bgcolor: "lightblue",
//                                                     },
//                                                 }}
//                                                 variant="contained"
//                                                 component="label"
//                                             >
//                                                 <Typography variant="h1" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
//                                                     +
//                                                 </Typography>
//                                                 <input type="file" multiple hidden onChange={handleFileChange} />
//                                             </Button>
//                                         </ImageList>
//                                     </Grid>
//                                 </Grid>
//                             )}
//                         </Grid>

//                         {/* Form Section */}
//                         <Grid item xs={12} sm={4} md={4}>
//                             <Box sx={{ padding: 2 }}>
//                                 <Grid container spacing={2}>
//                                     <Grid item xs={12} sm={6} md={6}>
//                                         <TextField
//                                             name="name"
//                                             label="Name"
//                                             value={postData.name || ""}
//                                             onChange={handleInputChange}
//                                             error={errors.name}
//                                             required
//                                             fullWidth
//                                             InputLabelProps={{ shrink: true }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={12} sm={6} md={6}>
//                                         <FormControl fullWidth>
//                                             <InputLabel>Category ID</InputLabel>
//                                             <Select
//                                                 name="category_id"
//                                                 value={postData.category_id || ""}
//                                                 label="Category ID"
//                                                 onChange={handleDropDown}
//                                             >
//                                                 <MenuItem value={1}>Electronics</MenuItem>
//                                                 <MenuItem value={2}>Household Items</MenuItem>
//                                                 <MenuItem value={3}>Car Parts</MenuItem>
//                                             </Select>
//                                         </FormControl>
//                                     </Grid>
//                                     <Grid item xs={12}>
//                                         <TextField
//                                             name="description"
//                                             label="Description"
//                                             value={postData.description || ""}
//                                             onChange={handleInputChange}
//                                             multiline
//                                             rows={4}
//                                             error={errors.description}
//                                             required
//                                             fullWidth
//                                             InputLabelProps={{ shrink: true }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <TextField
//                                             name="price"
//                                             label="Price"
//                                             value={postData.price || ""}
//                                             onChange={handleInputChange}
//                                             error={errors.price}
//                                             required
//                                             fullWidth
//                                             InputLabelProps={{ shrink: true }}
//                                         />
//                                     </Grid>
//                                     <Grid item xs={6}>
//                                         <TextField
//                                             name="stock"
//                                             label="Stock"
//                                             value={postData.stock || ""}
//                                             onChange={handleInputChange}
//                                             error={errors.stock}
//                                             required
//                                             fullWidth
//                                             InputLabelProps={{ shrink: true }}
//                                         />
//                                     </Grid>
//                                 </Grid>
//                             </Box>
//                         </Grid>

//                         {/* Action Buttons */}
//                         <Grid item>
//                             <Button onClick={() => setOpen(true)} variant="contained" color="primary">
//                                 Update
//                             </Button>
//                         </Grid>
//                         <Grid item>
//                             <Button onClick={handleBack} variant="outlined" color="primary">
//                                 Back
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Card>
//             </Grid>

//             {/* Confirmation Dialog */}
//             <Dialog open={open} onClose={() => setOpen(false)}>
//                 <DialogTitle>Update Confirmation</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>Are you sure you want to update this product?</DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleEditEntrySubmit} color="primary">
//                         Update
//                     </Button>
//                     <Button onClick={() => setOpen(false)}>Cancel</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar for Notifications */}
//             <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//                 <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Grid>
//     );
// }

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
    Paper,
    Divider,
    TextField,
    Box,
    Card,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    ImageList,
    ImageListItem,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import Timer from "../../../component/timer/timer";
import ImageCard from "./imagecontrol/imagecard";
import ImageGrid from "./imagecontrol/imagegrid";
import validateNumber from "../../../component/validators/num_validation";
import validateStrings from "../../../component/validators/string_validation";
import Layout from "../../../component/layout";



export default function ProductEdit({ productData, blobUrls: initialBlobUrls, error }) {
    const router = useRouter();
    const { product_id, minio_image_path } = router.query;

    // State Management
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [blobUrls, setBlobUrls] = useState(initialBlobUrls);
    const [postData, setPostData] = useState(productData);
    const [imageRemove, setImageRemove] = useState([]);
    const [selectedFile, setSelectedFiles] = useState([]);
    const [selFileToMinio, setSelFileToMinio] = useState([]);
    const [postReady, setPostReady] = useState(true);

    // Notifications
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    // Dialog States
    const [open, setOpen] = useState(false);

    // Handle File Upload
    const handleFileChange = (event) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files);
            const blobUrls = fileArray.map((file) => {
                const blob = new Blob([file], { type: file.type });
                return { blob, file };
            });
            setSelFileToMinio((prev) => [...prev, ...fileArray]);
            setSelectedFiles((prev) => [...prev, ...blobUrls]);
        }
    };

    // Handle Form Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let validationError = false;

        if (name === "name" || name === "description") {
            validationError = validateStrings(value);
        } else if (name === "price" || name === "stock") {
            validationError = validateNumber(value);
        }

        setErrors((prev) => ({ ...prev, [name]: validationError }));
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Dropdown Changes
    const handleDropDown = (e) => {
        setPostData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle Back Navigation
    const handleBack = () => {
        blobUrls.forEach((blobUrl) => URL.revokeObjectURL(blobUrl));
        router.push("/inventory");
    };

    // Handle Edit Submission
    const handleEditEntrySubmit = async () => {
        try {
            if (imageRemove.length > 0) {
                await fetch("/api/minio/remove/imageRemove", {
                    method: "POST",
                    body: JSON.stringify(imageRemove),
                });
            }

            if (selFileToMinio.length > 0) {
                const formData = new FormData();
                formData.append("minio_imagepath", minio_image_path);
                selFileToMinio.forEach((file) => formData.append("images", file));

                await fetch("/api/minio/edit/imageEdit", {
                    method: "POST",
                    body: formData,
                });
            }

            const insert_payload = {
                product_id,
                name: postData.name,
                description: postData.description,
                category_id: parseInt(postData.category_id),
                price: parseInt(postData.price),
                stock: parseInt(postData.stock),
            };

            const response = await fetch("/api/inventory/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(insert_payload),
            });

            if (response.ok) {
                showSnackbar("Product updated successfully", "success");
                setTimeout(() => router.push("/inventory"), 2000);
            } else {
                showSnackbar("Failed to update product", "error");
            }
        } catch (error) {
            showSnackbar("An error occurred while updating the product", "error");
        }
    };


    // Remove Image
    const removeImageBlob = (event, imageUrl) => {
        setBlobUrls((prev) => prev.filter((item) => item !== imageUrl));
        setSelectedFiles((prev) => prev.filter((item) => item !== imageUrl));
        setImageRemove((prev) => [...prev, imageUrl]);
    };

    // Snackbar Notification
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Layout>
            <Grid container justifyContent="center" spacing={2} sx={{ pt: 2, pl: 2, width: "100%" }}>
                <Grid item>
                    <Card sx={{ p: 2, borderRadius: 2 }}>
                        <Grid container spacing={2} justifyContent="flex-end">
                            {/* Image Section */}
                            <Grid item xs={12} sm={8} md={8}>
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    <Grid container spacing={2} sx={{ pt: 2 }} justifyContent="center" alignItems="center" direction="column">
                                        <Grid item>
                                            <Divider>Image on File</Divider>
                                            <ImageGrid blobUrls={blobUrls} removeImageBlob={removeImageBlob} />
                                        </Grid>
                                        <Grid item>
                                            <Divider>Image to Upload</Divider>
                                            <ImageList cols={3} rowHeight={200}>
                                                {selectedFile.map((url, index) => (
                                                    <ImageListItem key={index} sx={{ border: "1px solid lightgrey", borderRadius: 1 }}>
                                                        <ImageCard imageUrl={url} removeImageBlob={removeImageBlob} />
                                                    </ImageListItem>
                                                ))}
                                                <Button
                                                    sx={{
                                                        height: 200,
                                                        width: 300,
                                                        borderRadius: 2,
                                                        border: 3,
                                                        borderColor: "gray",
                                                        bgcolor: "lightgray",
                                                        "&:hover": {
                                                            bgcolor: "lightblue",
                                                        },
                                                    }}
                                                    variant="contained"
                                                    component="label"
                                                >
                                                    <Typography variant="h1" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }}>
                                                        +
                                                    </Typography>
                                                    <input type="file" multiple hidden onChange={handleFileChange} />
                                                </Button>
                                            </ImageList>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>

                            {/* Form Section */}
                            <Grid item xs={12} sm={4} md={4}>
                                <Box sx={{ padding: 2 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <TextField
                                                name="name"
                                                label="Name"
                                                value={postData.name || ""}
                                                onChange={handleInputChange}
                                                error={errors.name}
                                                required
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6}>
                                            <FormControl fullWidth>
                                                <InputLabel>Category ID</InputLabel>
                                                <Select
                                                    name="category_id"
                                                    value={postData.category_id || ""}
                                                    label="Category ID"
                                                    onChange={handleDropDown}
                                                >
                                                    <MenuItem value={1}>Electronics</MenuItem>
                                                    <MenuItem value={2}>Household Items</MenuItem>
                                                    <MenuItem value={3}>Car Parts</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                name="description"
                                                label="Description"
                                                value={postData.description || ""}
                                                onChange={handleInputChange}
                                                multiline
                                                rows={4}
                                                error={errors.description}
                                                required
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="price"
                                                label="Price"
                                                value={postData.price || ""}
                                                onChange={handleInputChange}
                                                error={errors.price}
                                                required
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="stock"
                                                label="Stock"
                                                value={postData.stock || ""}
                                                onChange={handleInputChange}
                                                error={errors.stock}
                                                required
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>

                            {/* Action Buttons */}
                            <Grid item>
                                <Button onClick={() => setOpen(true)} variant="contained" color="primary">
                                    Update
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button onClick={handleBack} variant="outlined" color="primary">
                                    Back
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>

                {/* Confirmation Dialog */}
                <Dialog open={open} onClose={() => setOpen(false)}>
                    <DialogTitle>Update Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Are you sure you want to update this product?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditEntrySubmit} color="primary">
                            Update
                        </Button>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                    </DialogActions>
                </Dialog>

                {/* Snackbar for Notifications */}
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </Layout>
   
    );
}

export async function getServerSideProps(context) {
    const { product_id, minio_image_path } = context.query;
    try {
        // Fetch product data
        const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/product_query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query_id: product_id }),
        });
        const productData = await productResponse.json();

        // Fetch image data
        const imageResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/minio/query/imageQuery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query_id: product_id, minio_image_path }),
        });
        const minioImageList = await imageResponse.json();

        // Fetch image blobs
        const imageBlobs = await Promise.all(
            minioImageList.map(async (item) => {
                const imageBlobResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/minio/query/minioImageQuery`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                });
                const blob = await imageBlobResponse.blob();
                const buffer = await blob.arrayBuffer();
                const base64 = Buffer.from(buffer).toString("base64");
                return { headers: item, blob: base64 };
            })
        );

        return {
            props: {
                productData,
                blobUrls: imageBlobs,
            },
        };
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return {
            props: {
                productData: {},
                blobUrls: [],
                error: "Failed to fetch data",
            },
        };
    }
}
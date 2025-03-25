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
    CardMedia,
} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloudUpload } from "@mui/icons-material";
import Timer from "../../../component/timer/timer";
import ImageCard from "./imagecontrol/imagecard";
import ImageGrid from "./imagecontrol/imagegrid";
import validateNumber from "../../../component/validators/num_validation";
import validateStrings from "../../../component/validators/string_validation";
import Layout from "../../../component/layout";

export default function ProductEdit({ productData, blobUrls: initialBlobUrls, minioImageList, error }) {
    const router = useRouter();
    const { product_id, minio_image_path } = router.query;

    // State Management
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [blobUrls, setBlobUrls] = useState(initialBlobUrls);
    const [minioList, setMinioList] = useState(minioImageList);
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
    const [imageDialogOpen, setImageDialogOpen] = useState(false); // State for image dialog
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image

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
        router.push("/inventory");
    };
    console.log(imageRemove)
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
                setTimeout(() => router.push("/inventory"), 1000);
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

    // Function to handle image deletion
    const handleDelete = (index) => {
        const updatedImages = minioList.filter((_, i) => i !== index);
        setMinioList(updatedImages);
        const listToDelete = minioList.filter((_, i) => i == index);
        setImageRemove((prev) => [...prev, listToDelete]);
    };

    // Function to handle image click (show full image)
    const handleImageClick = (url) => {
        setSelectedImage(url);
        setImageDialogOpen(true);
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
                                    <Card sx={{ 
                                        p: 3, 
                                        borderRadius: 3,
                                        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
                                        backgroundColor: 'background.paper'
                                    }}>
                                        <Grid container spacing={3}>
                                            {/* Image Section */}
                                            <Grid item xs={12}>
                                                {isLoading ? (
                                                    <Box display="flex" justifyContent="center" py={6}>
                                                        <CircularProgress size={60} thickness={4} />
                                                    </Box>
                                                ) : (
                                                    <>
                                                        {/* Existing Images */}
                                                        <Box mb={4}>
                                                            <Divider sx={{ 
                                                                mb: 3,
                                                                '&::before, &::after': {
                                                                    borderColor: 'divider'
                                                                }
                                                            }}>
                                                                <Typography 
                                                                    variant="subtitle1" 
                                                                    sx={{ 
                                                                        color: 'text.secondary',
                                                                        px: 2
                                                                    }}
                                                                >
                                                                    CURRENT IMAGES
                                                                </Typography>
                                                            </Divider>
                                                            
                                                            <Grid container spacing={3}>
                                                                {minioList.map((path, index) => (
                                                                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                                                        <Card sx={{
                                                                            position: 'relative',
                                                                            borderRadius: 2,
                                                                            overflow: 'hidden',
                                                                            height: '100%',
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                                                            boxShadow: 1,
                                                                            '&:hover': {
                                                                                transform: 'translateY(-4px)',
                                                                                boxShadow: 3,
                                                                                '& .delete-button': {
                                                                                    opacity: 1
                                                                                }
                                                                            }
                                                                        }}>
                                                                            <CardMedia
                                                                                component="img"
                                                                                image={`http://localhost:9000/projectimages/${path}`}
                                                                                alt={`Image ${index}`}
                                                                                sx={{
                                                                                    width: '100%',
                                                                                    height: 200,
                                                                                    objectFit: 'cover',
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => handleImageClick(`http://localhost:9000/projectimages/${path}`)}
                                                                            />
                                                                            
                                                                            <DeleteIcon
                                                                                className="delete-button"
                                                                                sx={{
                                                                                    position: 'absolute',
                                                                                    top: 12,
                                                                                    right: 12,
                                                                                    color: 'error.light',
                                                                                    opacity: 0,
                                                                                    transition: 'opacity 0.2s, transform 0.2s',
                                                                                    fontSize: 24,
                                                                                    backgroundColor: 'background.paper',
                                                                                    borderRadius: '50%',
                                                                                    p: 0.5,
                                                                                    boxShadow: 1,
                                                                                    '&:hover': {
                                                                                        color: 'error.main',
                                                                                        transform: 'scale(1.1)'
                                                                                    },
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    handleDelete(index);
                                                                                }}
                                                                            />
                                                                        </Card>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        </Box>
                                                        
                                                        {/* Upload Section */}
                                                        <Box mt={4}>
                                                            <Divider sx={{ 
                                                                mb: 3,
                                                                '&::before, &::after': {
                                                                    borderColor: 'divider'
                                                                }
                                                            }}>
                                                                <Typography 
                                                                    variant="subtitle1" 
                                                                    sx={{ 
                                                                        color: 'text.secondary',
                                                                        px: 2
                                                                    }}
                                                                >
                                                                    UPLOAD NEW IMAGES
                                                                </Typography>
                                                            </Divider>
                                                            
                                                            <Grid container spacing={3}>
                                                                {/* Preview of selected files */}
                                                                {selectedFile.map((url, index) => (
                                                                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                                                        <Card sx={{
                                                                            position: 'relative',
                                                                            borderRadius: 2,
                                                                            overflow: 'hidden',
                                                                            height: '100%',
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                                                            boxShadow: 1,
                                                                            '&:hover': {
                                                                                transform: 'translateY(-4px)',
                                                                                boxShadow: 3,
                                                                                '& .delete-button': {
                                                                                    opacity: 1
                                                                                }
                                                                            }
                                                                        }}>
                                                                            <CardMedia
                                                                                component="img"
                                                                                image={URL.createObjectURL(url.file)}
                                                                                alt={`Image ${index}`}
                                                                                sx={{
                                                                                    width: '100%',
                                                                                    height: 200,
                                                                                    objectFit: 'cover',
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={() => handleImageClick(URL.createObjectURL(url.file))}
                                                                            />
                                                                            
                                                                            <DeleteIcon
                                                                                className="delete-button"
                                                                                sx={{
                                                                                    position: 'absolute',
                                                                                    top: 12,
                                                                                    right: 12,
                                                                                    color: 'error.light',
                                                                                    opacity: 0,
                                                                                    transition: 'opacity 0.2s, transform 0.2s',
                                                                                    fontSize: 24,
                                                                                    backgroundColor: 'background.paper',
                                                                                    borderRadius: '50%',
                                                                                    p: 0.5,
                                                                                    boxShadow: 1,
                                                                                    '&:hover': {
                                                                                        color: 'error.main',
                                                                                        transform: 'scale(1.1)'
                                                                                    },
                                                                                    cursor: 'pointer'
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    removeImageBlob(index);
                                                                                }}
                                                                            />
                                                                        </Card>
                                                                    </Grid>
                                                                ))}
                                                                
                                                                {/* Upload Button */}
                                                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                                                    <Button
                                                                        component="label"
                                                                        sx={{
                                                                            height: 200,
                                                                            width: '100%',
                                                                            borderRadius: 2,
                                                                            border: '2px dashed',
                                                                            borderColor: 'divider',
                                                                            backgroundColor: 'action.hover',
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            transition: 'all 0.3s',
                                                                            '&:hover': {
                                                                                borderColor: 'primary.main',
                                                                                backgroundColor: 'action.selected',
                                                                                transform: 'translateY(-2px)'
                                                                            }
                                                                        }}
                                                                    >
                                                                        <CloudUpload sx={{ 
                                                                            fontSize: 48,
                                                                            color: 'text.secondary',
                                                                            mb: 1
                                                                        }} />
                                                                        <Typography variant="body2" color="text.secondary">
                                                                            Drag & drop or click to upload
                                                                        </Typography>
                                                                        <Typography variant="caption" color="text.disabled" sx={{ mt: 1 }}>
                                                                            (Max: 10 files)
                                                                        </Typography>
                                                                        <input 
                                                                            type="file" 
                                                                            multiple 
                                                                            hidden 
                                                                            onChange={handleFileChange} 
                                                                            accept="image/*"
                                                                        />
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Card>
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
                                                    <MenuItem value={4}>Clothing</MenuItem>
                                                    <MenuItem value={5}>Women</MenuItem>
                                                    <MenuItem value={6}>Men</MenuItem>
                                                    <MenuItem value={7}>Handmade</MenuItem>
                                                    <MenuItem value={8}>Office</MenuItem>
                                                    <MenuItem value={9}>Computer</MenuItem>
                                                    <MenuItem value={10}>Arts and Crafts</MenuItem>
                                                    <MenuItem value={11}>Tools</MenuItem>
                                                    <MenuItem value={12}>Books</MenuItem>
                                                    <MenuItem value={13}>Toys</MenuItem>
                                                    <MenuItem value={14}>Gaming</MenuItem>
                                                    <MenuItem value={15}>Vintage</MenuItem>
                                                    <MenuItem value={16}>Other</MenuItem>

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

                {/* Full Image Dialog */}
                <Dialog open={imageDialogOpen} onClose={() => setImageDialogOpen(false)} maxWidth="lg">
                    <DialogContent>
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt="Full Size"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '80vh', // Limit height to 80% of viewport height
                                    objectFit: 'contain', // Show the whole image without cropping
                                }}
                            />
                        )}
                    </DialogContent>
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

        return {
            props: {
                productData,
                blobUrls: null,
                minioImageList: minioImageList,
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
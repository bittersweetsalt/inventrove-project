import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Box, Paper, Divider, CardMedia, CardContent, Typography, Link, Button, Grid } from '@mui/material';
import Layout from '../../../component/layout';
import ImageProductBlobCarousel from './imagecarousel';

const ProductInfo = ({ productData, minioImageList, error }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // State for selected image
    

    const handleImageClick = (url) => {
        setSelectedImage(url);
    };

    console.log("ProductData: ", productData)
    console.log("minioImageList: ", minioImageList)
    
    return (
        <Layout>
            <Grid container justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 3, width: '98.3vw' }}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <Grid container spacing={3}>
                        {/* Image Gallery Section */}
                        <Grid item xs={12} md={6} lg={7}>
                            <Box sx={{ mb: 2 }}>
                            {/* Main Enlarged Image */}
                            {minioImageList ? (
                                <CardMedia
                                component="img"
                                image={`http://localhost:9000/projectimages/${minioImageList[0]}`}
                                alt="Selected product"
                                sx={{
                                    width: '100%',
                                    maxHeight: '60vh',
                                    objectFit: 'contain',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    mb: 2
                                }}
                                />
                            ) : (
                                <Box sx={{ 
                                height: '60vh', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                bgcolor: 'background.default',
                                borderRadius: 2
                                }}>
                                <Typography>Select an image to view</Typography>
                                </Box>
                            )}
                            
                            {/* Thumbnail Gallery */}
                            <Box sx={{ 
                                display: 'flex', 
                                gap: 2, 
                                overflowX: 'auto',
                                py: 1,
                                px: 1
                            }}>
                                {minioImageList?.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={img}
                                    alt={`Thumbnail ${index}`}
                                    onClick={() => handleImageClick(`http://localhost:9000/projectimages/${img}`)}
                                    sx={{
                                    width: 80,
                                    height: 80,
                                    objectFit: 'cover',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    border: minioImageList === img ? '2px solid' : '1px solid',
                                    borderColor: minioImageList === img ? 'primary.main' : 'divider',
                                    '&:hover': {
                                        borderColor: 'primary.main'
                                    }
                                    }}
                                />
                                ))}
                            </Box>
                            </Box>
                        </Grid>

                        {/* Product Info Section */}
                        <Grid item xs={12} md={6} lg={5}>
                            <Card sx={{ 
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            p: 3,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'divider'
                            }}>
                            <Typography variant="h5" gutterBottom>
                                {productData.name}
                            </Typography>
                            
                            <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
                                <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Category
                                </Typography>
                                <Typography variant="body1">
                                    {productData.category_id}
                                </Typography>
                                </Box>
                                
                                <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Price
                                </Typography>
                                <Typography variant="body1" color="primary.main" fontWeight="bold">
                                    ${productData.price}
                                </Typography>
                                </Box>
                                
                                <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Stock
                                </Typography>
                                <Typography variant="body1" sx={{ 
                                    color: productData.stock > 0 ? 'success.main' : 'error.main'
                                }}>
                                    {productData.stock} {productData.stock > 0 ? 'Available' : 'Out of Stock'}
                                </Typography>
                                </Box>
                            </Box>
                            
                            <Divider sx={{ my: 2 }} />
                            
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" gutterBottom>
                                Description
                                </Typography>
                                <Box sx={{ 
                                bgcolor: 'action.hover',
                                p: 2,
                                borderRadius: 1,
                                maxHeight: 300,
                                overflowY: 'auto'
                                }}>
                                <Typography variant="body1" paragraph>
                                    {productData.description}
                                </Typography>
                                </Box>
                            </Box>
                            
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'flex-end',
                                pt: 2
                            }}>
                                <Button 
                                // onClick={} 
                                variant="outlined" 
                                sx={{ minWidth: 120 }}
                                >
                                Back
                                </Button>
                            </Box>
                            </Card>
                        </Grid>
                        </Grid>
                    )}
                    </Paper>
                </Grid>
                </Grid>
        </Layout>
    );
};

export default ProductInfo;

export async function getServerSideProps(context) {
    const { product_id, minio_image_path } = context.query;
    
    try {
        // 1. Fetch product data
        const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/product_query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query_id: product_id }),
        });
        
        if (!productResponse.ok) {
            throw new Error('Failed to fetch product data');
        }
        
        const productData = await productResponse.json();

        // 2. Fetch image list
        const imageListResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/minio/query/imageQuery`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                query_id: product_id, 
                minio_image_path 
            }),
        });
        
        if (!imageListResponse.ok) {
            throw new Error('Failed to fetch image list');
        }
        
        const minioImageList = await imageListResponse.json();

        // 3. Instead of fetching blobs on server, just return the image paths
        // (Let the client fetch images as needed to reduce server load)
        return {
            props: {
                productData,
                minioImageList,
                error: null
            },
        };
        
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                productData: {},
                minioImageList: [],
                error: error.message || 'Failed to load data'
            },
        };
    }
}
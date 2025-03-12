import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Box, Paper, Divider, CardMedia, CardContent, Typography, Link, Button, Grid } from '@mui/material';
import Layout from '../../../component/layout';
import ImageProductBlobCarousel from './imagecarousel';

const ProductInfo = ({ }) => {
    const router = useRouter();
    const { product_id, name, description, category_id, price, stock, minio_image_path } = router.query;
    const [postData, setPostData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [blobUrls, setBlobUrls] = useState([]);

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
                        return response.blob();
                    });
                    
                    // Wait for all promises to resolve
                    const responses = await Promise.all(promises);

                    // Resolve all blobs and adding them into blobUrls hook
                    const blobs = responses.map(response => new Blob([response], { type: 'image/jpeg' }));
                    const configuredBlobUrls = blobs.map(blob => URL.createObjectURL(blob));
                    setBlobUrls(configuredBlobUrls);
                    console.log(blobUrls)
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

    const backToProductList = () =>{
        blobUrls.forEach(blobUrl => {
            URL.revokeObjectURL(blobUrl);
        });
        router.push("/inventory")
    }

    return (
        <Grid  
            container
            justifyContent="center"
            spacing={2}
        >
            <Grid item >
                <Paper 
                    sx={{
                        p: 2,
                        width: '98.3vw'
                    }}
                >
                
                    <Grid
                        item
                        xs={12} sm={10} md={8} lg={12} xl={12}
                        container
                        justifyContent="center"
                        sx={{ pt: 2}}
                    >
                            <Grid
                                item
                            >
                                {
                                    isLoading ? (
                                        <div></div>
                                    ): (
                                        <Grid container spacing={2} > 
                                            <Grid item xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                                                {blobUrls ?
                                                    <ImageProductBlobCarousel image_blobs={blobUrls}/> : <div>
                                                        Loading Images
                                                    </div>
                                                }
                                            </Grid>       
                                            <Grid
                                                item
                                                xs="auto"
                                                sm="auto"
                                                md="auto"
                                                lg="auto"
                                                xl="auto"
                                                sx={{ backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                                >
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={2} sm={2} md={4} lg={6} xl={6}>
                                                        <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                            Category ID:
                                                        </Typography>
                                                        <Typography variant="body1" component="div">
                                                            {postData.category_id}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3} sm={4} md={4} lg={6} xl={6}>
                                                        <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Item Name:
                                                        </Typography>
                                                        <Typography gutterBottom variant="body1" component="div">
                                                        {postData.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} sm={2} md={4} lg={6} xl={6}>
                                                        <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Price:
                                                        </Typography>
                                                        <Typography variant="body1" component="div">
                                                        ${postData.price}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} sm={2} md={4} lg={6} xl={6}>
                                                        <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Stock:
                                                        </Typography>
                                                        <Typography variant="body1" component="div">
                                                        {postData.stock}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                        <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                            Description:
                                                        </Typography>
                                                        <Box bgcolor="#d9f4ff" sx={{ height: '400px', border: '2px solid white', overflowY: 'auto', p: 1, borderRadius: 2 }}>
            
                                                            <Typography variant="body1" component="div">
                                                                {postData.description}
                                                            </Typography>
                                                        </Box>
                                                    </Grid>
                                                
                                                </Grid>
                                                <Grid container justifyContent="flex-end" sx={{ pt: 2}}>
                                                    <Grid item>
                                                        <Button onClick={backToProductList} variant="outlined" color="primary">
                                                            Back
                                                        </Button>
                                                    </Grid>
                                                </Grid> 
                                            </CardContent>

                                            
                                        </Grid>
                                        
                                                                                    
                                    </Grid>
                            )}
                    
                            </Grid>
                        </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ProductInfo;

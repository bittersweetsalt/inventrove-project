// pages/[slug].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Box, Paper, Divider, CardMedia, CardContent, Typography, Link, Button, Grid } from '@mui/material';
import Layout from '../../../PagesComponent/layout';
import ImageProductBlobCarousel from './imageCarousel';

const PostPage = ({ }) => {
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
        router.push("/Inventory")
    }

    return (
        <Box>
            <Layout>
                {
                    isLoading ? (
                        <div></div>
                    ): (
                    <Grid container spacing={2} justifyContent="center" alignItems="center" >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Card 
                                sx={{
                                    p:2,
                                }}
                            >  
                                <Grid container > 
                                    <Grid item xs="auto" sm="auto" md="auto" lg="auto" xl="auto">
                                        {blobUrls ?
                                            <ImageProductBlobCarousel image_blobs={blobUrls}/> : <div>
                                                Loading Images
                                            </div>
                                        }
                                    </Grid>       
                                    <Grid item xs="auto" sm="auto" md="auto" lg="auto" xl="auto" sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
                                        <CardContent>
                                            <Grid container>
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
                                                    <Typography variant="body1" component="div">
                                                        {postData.description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>     
                                    </Grid>    
                                    <Grid container justifyContent="right">
                                        <Grid item>
                                            <Button onClick={backToProductList} variant="outlined" color="primary">
                                                Back
                                            </Button>
                                        </Grid>
                                    </Grid>        
                                </Grid>
                            </Card>    
                        </Grid>
                    </Grid>
                    )}
                
            </Layout>
        </Box>
    );
};

export default PostPage;



// async function fetchAndCreateBlobs(url, boundary) {
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(query_payload)
//     });
//     const reader = response.body.getReader();
//     let { value: chunk, done: readerDone } = await reader.read();
//     const decoder = new TextDecoder();
//     let data = decoder.decode(chunk, { stream: true });
    
//     // Split the data by the boundary
//     const parts = data.split(`--${boundary}`);
//     const blobs = parts.map(part => {
//       // Extract the content type and the binary data from the part
//       const contentTypeMatch = part.match(/Content-Type: (.+)/);
//       const contentType = contentTypeMatch ? contentTypeMatch[1].trim() : 'application/octet-stream';
//       const binaryData = part.slice(part.indexOf('\n\n') + 2, part.lastIndexOf('\n'));
      
//       // Convert binary string to a Uint8Array
//       const binary = new Uint8Array(binaryData.length);
//       for (let i = 0; i < binaryData.length; i++) {
//         binary[i] = binaryData.charCodeAt(i);
//       }
      
//       // Create a blob from the binary data
//       return new Blob([binary], { type: contentType });
//     });
  
//     // Generate blob URLs
//     const blobUrls = blobs.map(blob => URL.createObjectURL(blob));
//     return blobUrls;
//   }
  
//   // Example usage
//   const boundary = '-------MinioQuery------';
//   fetchAndCreateBlobs('/api/minio/query/imageQuery', boundary).then(blobUrls => {
//     // Do something with the blob URLs, like rendering images
//     console.log(blobUrls)
//   });
  
// // const text = await response.text();
// // const boundary = '-------MinioQuery------';
// // const parts = text.split(`--${boundary}`);
// // // Remove the first and last part which are not image data
// // parts.shift();
// // parts.pop();



// // parts.map(part => {
// //     // Separate headers and body
// //     const [headers, body] = part.split('\n\n');
// //     const bodyWithoutTrailingCRLF = body.trimEnd();
// //     // Convert binary string to character-coded numbers
// //     const charCodes = bodyWithoutTrailingCRLF.split('').map(char => char.charCodeAt(0));
// //     // Create a Blob from the character-coded numbers
// //     const blob = new Blob([new Uint8Array(charCodes)], { type: 'image/png' });
// //     // console.log(URL.createObjectURL(blob))
    
// //     // Create a Blob URL
// //     const objectURL = URL.createObjectURL(blob);
// //     setBlobUrls(prevUrls => [...prevUrls, objectURL]);

// //     return URL.createObjectURL(blob);
// // });
 
                // if (response.ok) {
                //     const blob = await response.blob();
                //     setImageUrl(URL.createObjectURL(blob));
                //     console.log(URL.createObjectURL(blob));
                //     // console.log("ImageURL", imageUrl);
                //     console.log("Response is 200");
                //   } else {
                //     console.error('Failed to fetch image');
                //   }
// pages/[slug].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Box, Paper, Divider, CardMedia, CardContent, Typography, Link, Button, Grid } from '@mui/material';
import Image from 'next/image';
import Layout from '../../../PagesComponent/layout';

const PostPage = ({ }) => {
    const router = useRouter();
    const { product_id, name, description, category_id, price, stock } = router.query;
    const [postData, setPostData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [imageUrl, setImageUrl] = useState();
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
                console.log(postData);
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
            query_id: product_id
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
                    
                    // console.log(promises);
                    // Wait for all promises to resolve
                    const responses = await Promise.all(promises);


                    const blobs = responses.map(response => new Blob([response], { type: 'image/jpeg' }));
                    const configuredBlobUrls = blobs.map(blob => URL.createObjectURL(blob));

                    console.log(configuredBlobUrls)
                    setBlobUrls(configuredBlobUrls);
                   
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
                    <Grid container  spacing={2} justifyContent="center" alignItems="center" style={{ height: '90vh' }}>
                        <Grid item xs={10} sm={10} md={10} >
                            <Card 
                                sx={{
                                    p:2,
                                    borderRadius:2
                                }}
                            >  
                                <Grid container> 
                                    <Grid item xs={8}>
                                        <CardContent>
                                        <Box
                                            elevation={0}
                                            sx={{
                                                // height: '20vh',
                                                border: 2,
                                                borderColor: 'primary.main'
                                            }}
                                            display="flex"
                                            flexDirection="column"
                                            alignItems={"center"}
                                            justifyContent={'center'}
                                            borderRadius='8px'
                                        >
                                            <Card>
                                            {blobUrls && blobUrls.map((url, index) => (
                                                    <CardMedia
                                                        key={index}
                                                        component="img"
                                                        height="150"
                                                        image={url}
                                                        alt={index}
                                                        title={"titleasdasdsada"}
                                                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                                    />                                                     
                                                ))
                                            }
                                            {/* {blobUrls && 
                                            <CardMedia
                                                component="img"
                                                height="500"
                                                image={blobUrls[0]}
                                                alt={"alt"}
                                                title={"titleasdasdsada"}
                                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                            />  
                                                
                                            } */}

                                            {/* {imageUrl && 
                                            <CardMedia
                                                component="img"
                                                height="500"
                                                image={imageUrl}
                                                alt={"alt"}
                                                title={"titleasdasdsada"}
                                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                            />    } */}
                                            </Card>
                                        </Box>
                                        </CardContent>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Category ID:
                                                    </Typography>
                                                    <Typography variant="body1" component="div">
                                                        {postData.category_id}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Item Name:
                                                    </Typography>
                                                    <Typography gutterBottom variant="body1" component="div">
                                                        {postData.name}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Price:
                                                    </Typography>
                                                    <Typography variant="body1" component="div">
                                                        ${postData.price}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Stock:
                                                    </Typography>
                                                    <Typography variant="body1" component="div">
                                                        {postData.stock}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{}}>
                                                    <Typography variant="body2" color="textSecondary" component="div" fontSize="12px">
                                                        Description:
                                                    </Typography>
                                                    <Typography variant="body1" component="div">
                                                        {postData.description}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <Grid container justifyContent="right">
                                            <Grid item>
                                            <Button onClick={backToProductList} variant="outlined" color="primary">
                                                Back
                                            </Button>
                                            </Grid>
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
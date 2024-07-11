import { Card, Box, Typography, Grid, ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import ImageCard from "./imageComponent";

export default function ImageController({ product_id, minio_image_path }){

    const [remove_status, setRemoveStatus] = useState(false);
    const [removed_list, setRemoveList] = useState({});
    
    const [blobUrls, setBlobUrls] = useState([]);

    const [postData, setPostData] = useState({});

    const [isLoading, setIsLoading] = useState(false);

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

    const removeImageBlob = (e, imageUrl) =>{
        blobUrls.forEach(blobUrl => {
            if (imageUrl === blobUrl){
                URL.revokeObjectURL(blobUrl);
            }
        });
        const newBlobUrl = blobUrls.filter(item => item !== imageUrl)
        setBlobUrls(newBlobUrl)
    }

    return(
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
    )
}

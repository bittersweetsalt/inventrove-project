import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, ImageList, ImageListItem } from "@mui/material";

export default function ImageProductBlobCarousel( { image_blobs } ){
    
    const [currentImage, setCurrentImage] = useState(null);
      
    useEffect(() =>{
        if (image_blobs && image_blobs.length > 0) {
            const firstImageBlob = image_blobs[0];
            setCurrentImage(firstImageBlob);
        }
    }, [image_blobs])

    const handleClick = (blob) =>{
        console.log("Handle Click:", blob)
        setCurrentImage(blob);
        console.log("Current Image: ", currentImage)
    }
        
    return(
        <Grid
            container
        >
            <Grid
                item
            >
                <ImageList sx={{ width: "8vw", height: "50vh" }} cols={1} rowHeight={100}>
                    {image_blobs.map((url, index) => (
                        <ImageListItem key={index}>
                            <img
                                onClick={() => handleClick(url)}
                                src={url}
                                srcSet={url}
                                loading="lazy"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <Grid
                item
            >
                <Card elevation={0}>
                    <CardMedia
                        component="img"
                        image={currentImage}
                        title={"Title of Image"}
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain", height: "50vh", width: "40vw"}}
                    />
                </Card>
            </Grid>
            
        </Grid>
    );
}

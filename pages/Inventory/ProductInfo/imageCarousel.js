import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid } from "@mui/material";


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
            <Card >
                <Grid
                    container
                    // spacing={2}
                    direction="column"
                >                
                    {image_blobs && image_blobs.map((url, index) => (
                        <Grid 
                            item
                            xs={2}
                            key={index}
                        >
                            <CardMedia
                                onClick={() => handleClick(url)}
                                component="img"
                                image={url}
                                alt={index}
                                title={"Title of Image"}
                                sx={{ padding: "1em 1em 0 1em", objectFit: "contain", height: 100, width: 100}}
                            />  
                        </Grid>                                                   
                        ))
                    }
                </Grid>
            </Card>
                
            
            <Card >
                <CardMedia
                    component="img"
                    image={currentImage}
                    title={"Title of Image"}
                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain", height: "50vh", width: "50vw"}}
                />
            </Card>
        </Grid>
    );
}

import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, ImageList, ImageListItem, IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function ImageProductBlobCarousel( { image_blobs } ){
    
    const [startIndex, setStartIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [currentImage, setCurrentImage] = useState(null);

    const handleClick = (blob) =>{
        setCurrentImage(blob);
    }

    useEffect(() =>{
        if (image_blobs && image_blobs.length > 0) {
            const firstImageBlob = image_blobs[0];
            setCurrentImage(firstImageBlob);
        }
    }, [image_blobs])


    useEffect(() => {
            setTotalPages(Math.ceil(image_blobs.length / 6));
            setCurrentPage(Math.ceil(startIndex / 6) + 1);
        }, [startIndex, image_blobs.length]);

        const handlePrev = () => {
            setStartIndex((prevIndex) => {
            const newIndex = Math.max(prevIndex - 6, 0);
            setCurrentPage(Math.floor(newIndex / 6) + 1); // Update current page
            return newIndex;
            });
        };
                
        const handleNext = () => {
            setStartIndex((prevIndex) => {
            const newIndex = Math.min(prevIndex + 6, image_blobs.length - 6);
            setCurrentPage(Math.floor(newIndex / 6) + 1); // Update current page
            return newIndex;
            });
        };
    
    return(
        <Grid
            container
            direction="column" spacing={2}
            justifyContent="center" 
            alignItems="center"
        >
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
            <Grid
                item
                container
                direction="column" spacing={2}
                justifyContent="center" 
                alignItems="center"
            >   
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center',}}>
                        <IconButton onClick={handlePrev} disabled={startIndex === 0}>
                            <ArrowBackIosIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', overflowX: 'hidden', width: '40vw' }}>
                            <ImageList sx={{ display: 'flex', flexWrap: 'nowrap', gap: 2 }} cols={6} rowHeight={100}>
                            {image_blobs.slice(startIndex, startIndex + 6).map((url, index) => (
                                <ImageListItem key={index} sx={{ flex: '0 0 auto' }}>
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
                        </Box>
                        <IconButton onClick={handleNext} disabled={startIndex >= image_blobs.length - 6}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    
                    </Box>
                </Grid>
                <Grid item>
                    <Typography sx={{ ml: 2 }}>
                        {currentPage} / {totalPages}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}

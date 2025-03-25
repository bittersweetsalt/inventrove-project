import React, { memo } from 'react';
import {
    Grid,
    Card,
    CardMedia,
    Box,
    ImageList,
    ImageListItem,
    Typography,
    Button,
    Divider,
    CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageGallery = memo(({ 
    minioList, 
    selectedFile, 
    isLoading, 
    onDelete, 
    onFileChange, 
    onRemoveImageBlob 
}) => {
    return (
        <Grid container spacing={2} sx={{ pt: 2 }} justifyContent="center" alignItems="center" direction="column">
            <Grid item>
                <Divider>Image on File</Divider>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <Box sx={{ flexGrow: 1, padding: 3 }}>
                        <Grid container spacing={3}>
                            {minioList.map((path, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                                    <Card
                                        sx={{
                                            position: 'relative',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            '&:hover .delete-button': {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={`http://localhost:9000/projectimages/${path}`}
                                            alt={`Image ${index}`}
                                            loading="lazy"
                                            sx={{
                                                width: '100%',
                                                height: 'auto',
                                                display: 'block',
                                            }}
                                        />
                                        <DeleteIcon
                                            className="delete-button"
                                            sx={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                opacity: 0,
                                                transition: 'opacity 0.3s',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 0, 0, 0.8)',
                                                },
                                            }}
                                            onClick={() => onDelete(index)}
                                        />
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Grid>
            <Grid item>
                <Divider>Image to Upload</Divider>
                <ImageList cols={3} rowHeight={200}>
                    {selectedFile.map((url, index) => (
                        <ImageListItem key={index} sx={{ border: "1px solid lightgrey", borderRadius: 1 }}>
                            <ImageCard imageUrl={url} removeImageBlob={onRemoveImageBlob} />
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
                        <Typography 
                            variant="h1" 
                            sx={{ 
                                position: "absolute", 
                                top: "50%", 
                                left: "50%", 
                                transform: "translate(-50%, -50%)", 
                                pointerEvents: "none" 
                            }}
                        >
                            +
                        </Typography>
                        <input type="file" multiple hidden onChange={onFileChange} />
                    </Button>
                </ImageList>
            </Grid>
        </Grid>
    );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery; 
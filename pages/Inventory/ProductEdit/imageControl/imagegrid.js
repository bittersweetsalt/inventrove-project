import React from 'react';
import { Grid, ImageList, ImageListItem, useMediaQuery, useTheme } from '@mui/material';

import ImageCard from './imagecard'; // Assuming you have an ImageCard component

const ImageGrid = ({ blobUrls, removeImageBlob }) => {

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const betSmMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const betMdLg = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));


    const getCols = () => {
        if (isXs) return 0;
        if (betSmMd) return 1;
        if (betMdLg) return 2;
        if (isXl) return 3;
        return 0;
    };

    return (
        <Grid item>
            {blobUrls ? (
                <ImageList cols={getCols()} rowHeight={200}>
                    {blobUrls.map((url, index) => (
                        <ImageListItem key={index} sx={{ border: '1px solid lightgrey', borderRadius: 1 }}>
                            <ImageCard imageUrl={url} removeImageBlob={removeImageBlob} />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <div>Loading Images</div>
            )}
        </Grid>
    );
};

export default ImageGrid;

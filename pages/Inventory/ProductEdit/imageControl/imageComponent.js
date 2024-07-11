import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircleIcon from '@mui/icons-material/Circle';
import React from 'react';
import { Card, CardMedia, CardActions } from '@mui/material';
import { useState } from 'react';
import { red, } from '@mui/material/colors';

const ImageCard = ({ imageUrl, removeImageBlob }) => {
    const [isImageHovered, setIsImageHovered] = useState(false);
    const [isRemoveHovered, setIsRemovedHovered] = useState(false);
    const [isCardHovered, setIsCardHovered] = useState(false);

    function handleHover(index, isLeaving) {
        setIsRemovedHovered((prevItems) => {
          if (isLeaving) return prevItems.filter((item) => item !== index);
          return [...prevItems, index];
        });
    }

    const ifMouseHovered = (e) =>{
        setIsHovered(true)
        blobController()
    }

    return (
        <Card
            onMouseOver={() => setIsImageHovered(true)}
            onMouseOut={() => setIsImageHovered(false)}
            style={{ position: 'relative', width: '300px' }}
        >
        
        <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt="Contemplative Reptile"
        />
        {isImageHovered && (
            <CardActions style={{ position: 'absolute', top: '10px', right: '10px' }} >
                <DeleteOutlineIcon 
                    style={isRemoveHovered ? { color: red[100] } : { color: red[700] }}
                    onMouseEnter={() => setIsRemovedHovered(true)}
                    onMouseLeave={() => setIsRemovedHovered(false)}
                    onClick={(event) => removeImageBlob(event, imageUrl)}
                />
            </CardActions>
        )}
        
        
        </Card>
    );
};

export default ImageCard;

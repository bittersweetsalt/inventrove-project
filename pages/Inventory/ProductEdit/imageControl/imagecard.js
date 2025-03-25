import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircleIcon from '@mui/icons-material/Circle';
import React from 'react';
import { Card, CardMedia, CardActions } from '@mui/material';
import { useState } from 'react';
import { red, } from '@mui/material/colors';

function base64ToBlob(base64, mimeType) {
    const byteCharacters = atob(base64); // Decode the Base64 string
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
}

// Extract the Base64 data and MIME type from the imageUrl object
// const base64Data = imageUrl.blob.split(',')[1]; // Remove the "data:image/jpeg;base64," prefix if present
// const mimeType = 'image/jpeg'; // Adjust based on the image type (e.g., image/png, image/jpeg)


const ImageCard = ({ imageUrl, removeImageBlob }) => {
    console.log("ImageCard: ", imageUrl)

    

    const base64Data = imageUrl.blob; // Assuming it's already a pure Base64 string
    const mimeType = 'image/jpeg'; // Adjust based on the image type

    const blob = base64ToBlob(base64Data, mimeType);
    const imageSrc = URL.createObjectURL(blob);

    const publicimg = "http://localhost:9000/projectimages/10/kitten%204.jpeg"
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
            image={publicimg}
            alt="Image Set"
        />
        {isImageHovered && (
            <CardActions style={{ position: 'absolute', top: '10px', right: '10px' }} >
                <DeleteOutlineIcon 
                    style={isRemoveHovered ? { color: red[100] } : { color: red[700] }}
                    onMouseEnter={() => setIsRemovedHovered(true)}
                    onMouseLeave={() => setIsRemovedHovered(false)}
                    onClick={(  ) => removeImageBlob(event, imageUrl)}
                />
            </CardActions>
        )}
        
        </Card>
    );
};

export default ImageCard;

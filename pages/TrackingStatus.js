import React from 'react';
import { TextField, styled, Paper } from '@mui/material';
import Layout from '../component/layout';

const headerColor = "#61d2ff"; // Banner color (header color)
const hoverColor = "#a8e4ff"; // Hover color
const highlightColor = "#b2dfdb"; // Highlight color (e.g., light teal)
const textColor = "#013247"; // Text color for headers


const StyledTextField = styled(TextField)(({ theme }) => ({
    // Style the label
    "& .MuiInputLabel-root": {
        color: textColor, // Text color for the label
    },
    // Style the outline of the input field
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: headerColor, // Border color
        },
        "&:hover fieldset": {
            borderColor: hoverColor, // Hover border color
        },
        "&.Mui-focused fieldset": {
            borderColor: highlightColor, // Focused border color
        },
    },
    // Style the input text
    "& .MuiInputBase-input": {
        color: textColor, // Text color for the input
    },
    // Style the helper text
    "& .MuiFormHelperText-root": {
        color: textColor, // Text color for the helper text
    },
}));

// Usage example
export default function TrackingStatus(){
    return (
        <Layout>

            <Paper elevation={1} sx={{ mt: 4, pl: 2, pr: 2 }}>
                <StyledTextField
                    label="Custom TextField"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    helperText="This is a custom styled text field"
                />
            </Paper>
        </Layout>

    );
};
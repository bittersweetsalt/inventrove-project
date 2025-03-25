import React, { memo } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';

const ConfirmationDialog = memo(({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to update this product?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} color="primary">
                    Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
});

ConfirmationDialog.displayName = 'ConfirmationDialog';

export default ConfirmationDialog; 
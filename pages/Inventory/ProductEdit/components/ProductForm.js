import React, { memo } from 'react';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
    category_id: Yup.number()
        .required('Category is required'),
    price: Yup.number()
        .required('Price is required')
        .positive('Price must be positive'),
    stock: Yup.number()
        .required('Stock is required')
        .integer('Stock must be a whole number')
        .min(0, 'Stock cannot be negative'),
});

const ProductForm = memo(({ initialValues, onSubmit }) => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Category ID</InputLabel>
                        <Select
                            id="category_id"
                            name="category_id"
                            value={formik.values.category_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.category_id && Boolean(formik.errors.category_id)}
                        >
                            <MenuItem value={1}>Electronics</MenuItem>
                            <MenuItem value={2}>Household Items</MenuItem>
                            <MenuItem value={3}>Car Parts</MenuItem>
                        </Select>
                        {formik.touched.category_id && formik.errors.category_id && (
                            <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>
                                {formik.errors.category_id}
                            </div>
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="stock"
                        name="stock"
                        label="Stock"
                        type="number"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.stock && Boolean(formik.errors.stock)}
                        helperText={formik.touched.stock && formik.errors.stock}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
});

ProductForm.displayName = 'ProductForm';

export default ProductForm; 
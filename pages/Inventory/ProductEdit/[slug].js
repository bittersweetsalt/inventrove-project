// pages/[slug].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Box, Paper, Divider, CardMedia, CardContent, Typography, Link, Button, Grid } from '@mui/material';
import Layout from '../../../PagesComponent/layout';
import ProductEdit from './productEdit';

const EditPage = ({ }) => {
    const router = useRouter();
    const { product_id, name, description, category_id, price, stock, minio_image_path } = router.query;
    const [postData, setPostData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [blobUrls, setBlobUrls] = useState([]);

    console.log(product_id, " ", minio_image_path)

    return (
        <Box>
            <Layout>
                <ProductEdit></ProductEdit>
            </Layout>
        </Box>
    );
};

export default EditPage;
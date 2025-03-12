import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card, Box, Paper, Divider, CardMedia, CardContent, Typography, Link, Button, Grid } from '@mui/material';
import Layout from '../../../component/layout';
import ProductEdit from '.';

const EditPage = ({ }) => {

    return (
        <Layout>
            <ProductEdit></ProductEdit>
        </Layout>
    );
};

export default EditPage;
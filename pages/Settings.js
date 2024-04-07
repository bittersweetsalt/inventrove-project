import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Box, Card } from '@mui/material';
import SearchAppBar from '../PagesComponent/topnavbar';
import Layout from '../PagesComponent/layout';

export default function Settings() {
    return (
        <Box>
            <Layout>
                Settings Pages Component
            </Layout>
        </Box>
    );
}

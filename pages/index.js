import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Box, Card, Grid } from '@mui/material';
import SideBar from '../PagesComponent/layout/navbar';
import Layout from '../PagesComponent/layout';

export default function Home() {

  //don't forget to add router support for linking

  return (
    <Box>
        <Layout>
            WELCOME!
        </Layout>
    </Box>
  );
}

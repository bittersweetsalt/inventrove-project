// pages/[id].js
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import Layout from '../../../PagesComponent/layout';
// Create button to go back to Orders page

const DynamicPage = () => {
    const router = useRouter();
    const { data } = router.query;
    console.log("This is ID:", router.query);
  return (
    <Box>
        <Layout>
            This is the Buyers `id` Page
        </Layout>
    </Box>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const { id } = params;

//   // Fetch data based on the id from your database
//   const data = fetchDataFromDatabase(id);

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default DynamicPage;

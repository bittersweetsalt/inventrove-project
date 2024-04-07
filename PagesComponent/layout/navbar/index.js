import Head from 'next/head';
import styles from '../../../styles/Home.module.css';


import { Box, Card } from '@mui/material';
// import ResponsiveDrawer from '../../../PagesComponent/navbar/navbar';
import ResponsiveDrawer from './navbar';

export default function SideBar() {
  return (
    <div>
      <ResponsiveDrawer>
        
      </ResponsiveDrawer>
    </div>
  );
}

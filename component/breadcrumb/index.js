import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const BreadcrumbsComponent = () => {
  const router = useRouter();
  const pathnames = router.pathname.split('/').filter((x) => x);

  const formatPathname = (pathname) => {
    return pathname.replace('-', ' ');
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      
        <Typography 
            color="d4f1ff" 
            variant="h6"
        >
            Home
        </Typography>
      
        {pathnames.map((value, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const formattedValue = formatPathname(value);
                
            return index === pathnames.length - 1 ? (
            <Typography 
                color="d4f1ff" 
                key={routeTo}
                variant="h6"
            >
                {formattedValue}
            </Typography>
            ) : (
                <Typography 
                color="d4f1ff" 
                key={routeTo}
                variant="h6"
            >
                {formattedValue}
            </Typography>
            );
        })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsComponent;

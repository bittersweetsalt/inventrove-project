import { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      onFinish(); // Notify parent that splash screen is done
    }, 3000); // Show splash screen for 3 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1976d2', // Material UI primary color
            color: '#fff',
            zIndex: 1000,
          }}
        >
          <Box textAlign="center">
            <Typography variant="h3" gutterBottom>
              Welcome
            </Typography>
            <CircularProgress color="inherit" />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
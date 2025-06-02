import { useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../component/context/AuthContext';
import { Box, Button, TextField, Typography, Container, Paper, Slide } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import SplashScreen from '../../component/splashscreen';

// import { TextField, Button, Box, Typography, Modal } from "@mui/material";
export default function Login() {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(false);

  
    const [open, setOpen] = useState(false);

  const [formLoginData, setFormLoginData] = useState({
    email: '',
    password: '',    
  });

  const [formRegisterData, setFormRegisterData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    position: '',
    department: '',
    phone: '',
    hire_date: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formLoginData),
    });
    console.log(res);

    if (res.ok) {
    //   const { token } = await res.json();      
        const res_obj= await res.json();
        // console.log(res_obj);
        localStorage.setItem('user_settings', JSON.stringify(res_obj.user_settings));
        // Store token and user info in context
        login(res_obj.token);
        // Optionally redirect to a dashboard or another page
        router.push('/orders');
    } else {
    const error = await res.json();   
    alert(error.error);
    }
  };


  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setFormLoginData({ ...formLoginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setFormRegisterData({ ...formRegisterData, [name]: value });
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();
    console.log(formRegisterData)
    try {
      // Send form data to the register API using fetch
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formRegisterData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('User registered successfully!');
        console.log('Success:', data);
      } else {
        const errorData = await response.json();
        console.error('Error registering user:', errorData);
        alert('There was an error registering the user.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('There was a network error.');
    }
  };

 useEffect(() => {
    // Check if the user has visited before using localStorage
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowSplash(true);
      localStorage.setItem('hasVisited', 'true'); // Mark as visited
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };


  return (   
    <div>
    {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
<Container component="main" maxWidth="xs">
<Paper elevation={3} sx={{ mt: 8, p: 4 }}>
  <Typography variant="h4" align="center" gutterBottom>
    {isLogin ? 'Login' : 'Register'}
  </Typography>
  <AnimatePresence mode="wait">
    {isLogin ? (
      <motion.div
        key="login"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleLoginSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formLoginData.email}
            onChange={handleLoginChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formLoginData.password}
            onChange={handleLoginChange}
            required
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </motion.div>
    ) : (
      <motion.div
        key="register"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={handleRegSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formRegisterData.email}
            onChange={handleRegisterChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formRegisterData.password}
            onChange={handleRegisterChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            type="text"
            name="first_name"
            value={formRegisterData.first_name}
            onChange={handleRegisterChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            type="text"
            name="last_name"
            value={formRegisterData.last_name}
            onChange={handleRegisterChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Position"
            type="text"
            name="position"
            value={formRegisterData.position}
            onChange={handleRegisterChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Department"
            type="text"
            name="department"
            value={formRegisterData.department}
            onChange={handleRegisterChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone"
            type="text"
            name="phone"
            value={formRegisterData.phone}
            onChange={handleRegisterChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Hire Date"
            type="date"
            name="hire_date"
            value={formRegisterData.hire_date}
            onChange={handleRegisterChange}
            InputLabelProps={{ shrink: true }}
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
      </motion.div>
    )}
  </AnimatePresence>
  <Box textAlign="center" mt={2}>
    <Button onClick={() => setIsLogin(!isLogin)}>
      {isLogin ? 'Need to register? Click here' : 'Already have an account? Login'}
    </Button>
  </Box>
</Paper>
</Container>
</div>
  );
}

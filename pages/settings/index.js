import { 
  Paper, 
  Box, 
  Typography, 
  Button, 
  Grid,
  TextField,
  Divider,
  Switch,
  FormControlLabel,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  colors
} from "@mui/material";
import { 
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Language as LanguageIcon,
  AccountCircle as AccountIcon,
  Save as SaveIcon
} from "@mui/icons-material";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Layout from "../../component/layout";

// Custom colors matching your theme
const headerColor = "#61d2ff";
const hoverColor = "#a8e4ff";
const highlightColor = "#b2dfdb";
const textColor = "#013247";

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
  }
}));

const SettingItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: hoverColor,
    borderRadius: '8px'
  }
}));

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      weeklyDigest: true
    },
    appearance: {
      darkMode: false,
      fontSize: 'medium',
      density: 'comfortable'
    },
    security: {
      twoFactorAuth: true,
      autoLogout: false
    },
    account: {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatars/john.jpg'
    }
  });

  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    language: 'en',
    timezone: 'UTC+0'
  });

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Settings saved:', { settings, formData });
    // In a real app, you would call an API here
    alert('Settings saved successfully!');
  };

  return (
    <Layout>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: textColor, mb: 3 }}>
        Settings
      </Typography>

      {/* Account Settings */}
      <SectionPaper>
        <Typography variant="h6" sx={{ color: headerColor, mb: 2 }}>
          <AccountIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Account Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                src={settings.account.avatar} 
                sx={{ width: 120, height: 120, mb: 2 }}
              />
              <Button variant="outlined" color="primary">
                Change Avatar
              </Button>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Timezone"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value="UTC+0">UTC+0 (London)</option>
                  <option value="UTC-5">UTC-5 (New York)</option>
                  <option value="UTC+8">UTC+8 (Singapore)</option>
                </TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </SectionPaper>

      {/* Notification Settings */}
      <SectionPaper>
        <Typography variant="h6" sx={{ color: headerColor, mb: 2 }}>
          <NotificationsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Notification Preferences
        </Typography>
        
        <List>
          <SettingItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.blue[100] }}>
                <NotificationsIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Email Notifications" 
              secondary="Receive important updates via email" 
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={() => handleToggle('notifications', 'email')}
                    color="primary"
                  />
                }
              />
            </ListItemSecondaryAction>
          </SettingItem>
          
          <Divider variant="inset" component="li" />
          
          <SettingItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.green[100] }}>
                <NotificationsIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Push Notifications" 
              secondary="Get alerts on your mobile device" 
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.push}
                    onChange={() => handleToggle('notifications', 'push')}
                    color="primary"
                  />
                }
              />
            </ListItemSecondaryAction>
          </SettingItem>
          
          <Divider variant="inset" component="li" />
          
          <SettingItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.orange[100] }}>
                <NotificationsIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Weekly Digest" 
              secondary="Summary of weekly activity" 
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.weeklyDigest}
                    onChange={() => handleToggle('notifications', 'weeklyDigest')}
                    color="primary"
                  />
                }
              />
            </ListItemSecondaryAction>
          </SettingItem>
        </List>
      </SectionPaper>

      {/* Appearance Settings */}
      <SectionPaper>
        <Typography variant="h6" sx={{ color: headerColor, mb: 2 }}>
          <PaletteIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Appearance
        </Typography>
        
        <List>
          <SettingItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.purple[100] }}>
                <PaletteIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Dark Mode" 
              secondary="Switch between light and dark theme" 
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.appearance.darkMode}
                    onChange={() => handleToggle('appearance', 'darkMode')}
                    color="primary"
                  />
                }
              />
            </ListItemSecondaryAction>
          </SettingItem>
        </List>
      </SectionPaper>

      {/* Security Settings */}
      <SectionPaper>
        <Typography variant="h6" sx={{ color: headerColor, mb: 2 }}>
          <SecurityIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Security
        </Typography>
        
        <List>
          <SettingItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: colors.red[100] }}>
                <SecurityIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary="Two-Factor Authentication" 
              secondary="Extra layer of security for your account" 
            />
            <ListItemSecondaryAction>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onChange={() => handleToggle('security', 'twoFactorAuth')}
                    color="primary"
                  />
                }
              />
            </ListItemSecondaryAction>
          </SettingItem>
        </List>
      </SectionPaper>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ px: 4 }}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
    </Layout>
  );
}
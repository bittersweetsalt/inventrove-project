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

export default function SettingsPage({ userData }) {
  const [user, setUser] = useState(userData);
  const [settings, setSettings] = useState(userData.settings);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in settings) {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

//   const handleSave = async () => {
//     try {
//       // Save settings to API
//       const response = await fetch('/api/settings/settings_update', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           userId: user.id,
//           userData: {
//             first_name: user.first_name,
//             last_name: user.last_name,
//             email: user.email,
//             phone: user.phone
//           },
//           settings 
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save settings');
//       }

//       const result = await response.json();
//       console.log('Settings saved:', result);
//       alert('Settings saved successfully!');
//     } catch (error) {
//       console.error('Error saving settings:', error);
//       alert('Failed to save settings. Please try again.');
//     }
//   };

const handleSave = async () => {
    try {
        // Save settings to API
        const response = await fetch('/api/settings/settings_update', {  // Changed endpoint to match API route
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            userId: userData.id,
            userData: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                phone: userData.phone
            },
            settings: {  // Ensure all settings fields are included
                theme: settings.theme,
                language: settings.language,
                receive_email_notifications: settings.receive_email_notifications,
                receive_sms_notifications: settings.receive_sms_notifications,
                timezone: settings.timezone,
                items_per_page: settings.items_per_page
            }
        }),
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save settings');
        }

        const result = await response.json();
        console.log('Settings saved:', result);
        
        // Update local state with the returned data
        setUser(prev => ({
            ...prev,
            ...result.user
        }));
        setSettings(prev => ({
            ...prev,
            ...result.settings
        }));

        alert('Settings saved successfully!');
    } catch (error) {
        console.error('Error saving settings:', error);
        alert(`Failed to save settings: ${error.message}`);
    }
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
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mb: 2,
                    bgcolor: colors.blue[500],
                    fontSize: '3rem'
                  }}
                >
                  {user.first_name.charAt(0)}{user.last_name.charAt(0)}
                </Avatar>
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
                    label="First Name"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Language"
                    name="language"
                    value={settings.language}
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
                    value={settings.timezone}
                    onChange={handleInputChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="UTC">UTC (Universal Time)</option>
                    <option value="UTC-5">UTC-5 (Eastern Time)</option>
                    <option value="UTC-8">UTC-8 (Pacific Time)</option>
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
                      checked={settings.receive_email_notifications}
                      onChange={() => handleToggle('receive_email_notifications')}
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
                primary="SMS Notifications" 
                secondary="Get alerts via text message" 
              />
              <ListItemSecondaryAction>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.receive_sms_notifications}
                      onChange={() => handleToggle('receive_sms_notifications')}
                      color="primary"
                    />
                  }
                />
              </ListItemSecondaryAction>
            </SettingItem>
            
            <Divider variant="inset" component="li" />
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
                      checked={settings.theme === 'dark'}
                      onChange={() => setSettings(prev => ({
                        ...prev,
                        theme: prev.theme === 'light' ? 'dark' : 'light'
                      }))}
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
                  <CloudIcon color="primary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary="Items Per Page" 
                secondary="Number of items displayed in tables" 
              />
              <ListItemSecondaryAction>
                <TextField
                  select
                  value={settings.items_per_page}
                  onChange={handleInputChange}
                  name="items_per_page"
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                  size="small"
                >
                  {[5, 10, 15, 20, 25, 50].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </TextField>
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

export async function getServerSideProps(context) {
  try {
    const cookies = context.req.headers.cookie || "";
    const userId = cookies
      .split(";")
      .find((c) => c.trim().startsWith("userId="))
      ?.split("=")[1];

    if (!userId) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    // Fetch user data from your API
     // Fetch user settings from your API
    // In a real app, you would also need to handle authentication
    const settingsResponse = await fetch(`http://localhost:3000/api/settings/settings`, {
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userID: userId}),
            }
        );
        
    if (!settingsResponse.ok) {
      throw new Error('Failed to fetch settings');
    }


    const userData = await settingsResponse.json();

    return {
      props: {
        userData
      },
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    
    // Return default values if API fails
    return {
      props: {
        userData: {
          id: 0,
          email: 'user@example.com',
          first_name: 'John',
          last_name: 'Doe',
          position: 'Employee',
          department: 'General',
          phone: '1234567890',
          status: 'active',
          settings: {
            theme: 'light',
            language: 'en',
            receive_email_notifications: true,
            receive_sms_notifications: false,
            timezone: 'UTC',
            items_per_page: 10
          }
        }
      },
    };
  }
}
import React, { useState,useEffect } from 'react';
import { TextField, MenuItem, Button, Avatar, IconButton, Grid, Typography, Box, Paper ,CircularProgress} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const AdminProfileCard = () => {
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    designation: '',
    experience: '',
    linkedin: '',
    github: '',
    portfolio: '',
    facebook: '',
    achievements: '',
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false
  });

  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/admin/current-admin', {
          method: 'GET',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const Admin = await response.json();
        // console.log("data",Alumni);
        setAdminData(Admin.data);
  
        setAvatar(Admin.data.avatar); // Assuming `avatar` is part of the response
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchProfileData();
  }, []);

  
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatar({
          file: file, // Store the file for uploading
          preview: reader.result, // Store the preview URL
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });

    if (value.trim() !== '') {
      setErrors({ ...errors, [name]: false });
    }
  };


  const handleSaveAvatar = async () => {
    if (avatar && avatar.file) {
      setLoading(true);
      const formData = new FormData();
      formData.append('avatar', avatar.file);

      try {
        const response = await fetch('http://localhost:8000/api/alumni/update-avatar', {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const Res = await response.json();
        console.log('Avatar updated successfully:', Res.data.avatar);
        alert('Avatar updated successfully!');
        setAvatar(Res.data.avatar); // Update state with new avatar URL after successful upload
      } catch (error) {
        console.error('Error updating avatar:', error);
        alert('Failed to update avatar.');
      }finally {
        setLoading(false); // Stop loading state once done
      }
    } else {
      alert('No avatar selected!');
    }
  };

  const handleSaveProfile = async () => {
    // Simple form validation
    const newErrors = {
      name: !adminData.name,
      email: !adminData.email,
    };
    setErrors(newErrors);
  
    if (!newErrors.name && !newErrors.email) {
      try {
        const response = await fetch('http://localhost:8000/api/alumni/update-details', {
          method: 'POST', // Assuming this is the correct method for updating details
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminData), // Send profileData as JSON
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const Admin = await response.json();
        setAdminData(Admin.data);
      


        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again later.');
      }
    }
  };
  return (
    <Grid container component={Paper} elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" align="center" sx={{ width: '100%', textAlign: 'center', mb: 3,mt:7 }}>
        Admin Profile
      </Typography>

      <Box display="flex" alignItems="flex-start" gap={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box position="relative">
            <Avatar
              src={avatar && avatar.preview ? avatar.preview : avatar} // Use preview if available, else use the fetched URL
                  sx={{ width: 150, height: 150 }}
            />
            <IconButton
              component="label"
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: 'white',
                borderRadius: '50%',
                boxShadow: 2,
              }}
            >
              <EditIcon />
              <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ mt: 2, textAlign: 'center' }}>
            {adminData.name || 'Your Name'}
          </Typography>
          {/* Show "Uploading" spinner if loading */}
            {loading ? (
                      <CircularProgress />
                      ) : (
                <Button onClick={handleSaveAvatar} variant="contained" disabled={loading}>
                  Save Avatar
                </Button>
            )}
        </Box>

        <Box component="form" flexGrow={1}>
          <TextField
            fullWidth
            name="name"
            label="Full Name"
            value={adminData.name}
            onChange={handleInputChange}
            margin="normal"
            error={errors.name}
            helperText={errors.name && 'Name is required'}
            required
          />

          <TextField
            fullWidth
            name="email"
            label="Email"
            value={adminData.email}
            onChange={handleInputChange}
            margin="normal"
            error={errors.email}
            helperText={errors.email && 'Email is required'}
            required
          />
          <TextField
            fullWidth
            name="phone"
            label="Phone"
            value={adminData.phone}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            name="designation"
            label="Designation"
            value={adminData.designation}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            name="experience"
            label="Experience"
            value={adminData.experience}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            name="linkedin"
            label="LinkedIn"
            value={adminData.linkedin}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="github"
            label="GitHub"
            value={adminData.github}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="portfolio"
            label="Portfolio"
            value={adminData.portfolio}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="facebook"
            label="Facebook"
            value={adminData.facebook}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            name="achievements"
            label="Achievements"
            value={adminData.achievements}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSaveProfile}>
            Save Profile
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default AdminProfileCard;
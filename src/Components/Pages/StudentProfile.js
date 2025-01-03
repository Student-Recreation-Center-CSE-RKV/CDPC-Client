import React, { useState } from 'react';
import { TextField, MenuItem, Button, Avatar, IconButton, Grid, Typography, Box, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function ProfileCard() {
  const [avatar, setAvatar] = useState(null);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    collegeId: '',
    year: '',
    branch: '',
    phone: '',
    skills: '',
    description: '',
    github: '',
    linkedIn: '',
    portfolio: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false
  });

  const years = ['E1', 'E2', 'E3', 'E4'];
  const branches = ['Computer Science Engineering', 'Electronics and Communication Engineering','Electrical and Electronics Engineering','Civil Engineering','Mechanical Engineering','Chemical Engineering','Metallurgical and Materials Engineering'];

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });

    if (value.trim() !== '') {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSaveProfile = () => {
    // Simple form validation (can be expanded)
    const newErrors = {
      name: !profileData.name,
      email: !profileData.email
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email) {
      // Save profile logic
      console.log('Profile saved:', profileData);
    }
  };

  return (
    <Grid container component={Paper} elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" align="center" sx={{ width: '100%', textAlign: 'center', mb: 3 }}>
        My Profile
      </Typography>

      <Box display="flex" alignItems="flex-start" gap={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box position="relative">
            <Avatar src={avatar} sx={{ width: 150, height: 150 }} />
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
            {profileData.name || 'Your Name'}
          </Typography>
        </Box>

        <Box component="form" flexGrow={1}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={profileData.name}
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
            value={profileData.email}
            onChange={handleInputChange}
            margin="normal"
            error={errors.email}
            helperText={errors.email && 'Email is required'}
            required
          />

<TextField
  fullWidth
  name="collegeId"
  label="College ID"
  value={profileData.collegeId}
  onChange={handleInputChange}
  margin="normal"
  placeholder="R2XXXXX"  // Example input
  InputLabelProps={{
    shrink: true, // Ensures the label stays at the top of the field
  }}
/>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                name="year"
                label="Year"
                value={profileData.year}
                onChange={handleInputChange}
                margin="normal"
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                name="branch"
                label="Branch"
                value={profileData.branch}
                onChange={handleInputChange}
                margin="normal"
              >
                {branches.map((branch) => (
                  <MenuItem key={branch} value={branch}>
                    {branch}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <TextField
            fullWidth
            name="phone"
            label="Phone"
            value={profileData.phone}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="skills"
            label="Skills"
            value={profileData.skills}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            name="description"
            label="Description"
            value={profileData.description}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            name="github"
            label="GitHub"
            value={profileData.github}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="linkedIn"
            label="LinkedIn"
            value={profileData.linkedIn}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="portfolio"
            label="Portfolio"
            value={profileData.portfolio}
            onChange={handleInputChange}
            margin="normal"
          />

          <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSaveProfile}>
            Save Profile
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}

export default ProfileCard;
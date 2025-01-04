import React, { useState ,useEffect} from 'react';
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
  

  // Fetch user data from backend
useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/student/current-student', {
        method: 'GET',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const Student = await response.json();
      // console.log("data",Student.data);
      setProfileData(Student.data);

      setAvatar(Student.data.avatar); // Assuming `avatar` is part of the response
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  fetchProfileData();
}, []);

const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    // Preview the image for display
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar({
        file: file, // Store the actual file for uploading
      });
    };
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
  const handleSaveAvatar = async () => {
    // Save avatar logic
    if (avatar) {
      console.log(avatar);
      try {
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append('avatar', avatar);
  
        const response = await fetch('http://localhost:8000/api/student/update-avatar', {
          credentials:"include",
          method: 'PATCH', // Assuming POST is the correct method for updating the avatar
          body: formData, // Send the FormData object
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Avatar updated successfully:', data);
        alert('Avatar updated successfully!');
      } catch (error) {
        console.error('Error updating avatar:', error);
        alert('Failed to update avatar. Please try again later.');
      }
    } else {
      alert('No avatar selected!');
    }
  };
  
  const handleSaveProfile = async () => {
    // Simple form validation
    const newErrors = {
      name: !profileData.name,
      email: !profileData.email,
    };
    setErrors(newErrors);
  
    if (!newErrors.name && !newErrors.email) {
      try {
        const response = await fetch('http://localhost:8000/api/student/update-details', {
          method: 'POST', // Assuming this is the correct method for updating details
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData), // Send profileData as JSON
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Profile updated successfully:', data);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again later.');
      }
    }
  };
  

  return (
    <Grid container component={Paper} elevation={3} sx={{ p: 3 ,marginTop:7}}>
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
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSaveAvatar}
          >
            Save Avatar
          </Button>
          
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
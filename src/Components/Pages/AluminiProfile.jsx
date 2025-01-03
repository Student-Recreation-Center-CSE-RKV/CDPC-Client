import React, { useState } from 'react';
import { TextField, MenuItem, Button, Avatar, IconButton, Grid, Typography, Box, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function AlumniProfileCard() {
  const [avatar, setAvatar] = useState(null);
  const [alumniData, setAlumniData] = useState({
    name: '',
    email: '',
    batch: '',
    branch: '',
    phone: '',
    company: '',
    designation: '',
    workingLocation: '',
    experience: '',
    linkedin: '',
    github: '',
    portfolio: '',
    facebook: '',
    careerGoals: '',
    achievements: '',
    skills: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false
  });

  const batches = ['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];
  const branches = ['Computer Science Engineering', 'Electronics and Communication Engineering', 'Electrical and Electronics Engineering', 'Civil Engineering', 'Mechanical Engineering', 'Chemical Engineering', 'Metallurgical and Materials Engineering'];

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
    setAlumniData({ ...alumniData, [name]: value });

    if (value.trim() !== '') {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleSaveProfile = () => {
    // Simple form validation (can be expanded)
    const newErrors = {
      name: !alumniData.name,
      email: !alumniData.email
    };
    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email) {
      // Save profile logic
      console.log('Alumni Profile saved:', alumniData);
    }
  };

  return (
    <Grid container component={Paper} elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" align="center" sx={{ width: '100%', textAlign: 'center', mb: 3 }}>
        Alumni Profile
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
            {alumniData.name || 'Your Name'}
          </Typography>
        </Box>

        <Box component="form" flexGrow={1}>
          <TextField
            fullWidth
            name="name"
            label="Name"
            value={alumniData.name}
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
            value={alumniData.email}
            onChange={handleInputChange}
            margin="normal"
            error={errors.email}
            helperText={errors.email && 'Email is required'}
            required
          />

          <TextField
            fullWidth
            name="batch"
            label="Batch"
            value={alumniData.batch}
            onChange={handleInputChange}
            margin="normal"
            select
          >
            {batches.map((batch) => (
              <MenuItem key={batch} value={batch}>
                {batch}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            name="branch"
            label="Branch"
            value={alumniData.branch}
            onChange={handleInputChange}
            margin="normal"
            select
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            name="phone"
            label="Phone"
            value={alumniData.phone}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="company"
            label="Company"
            value={alumniData.company}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="designation"
            label="Designation"
            value={alumniData.designation}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="workingLocation"
            label="Working Location"
            value={alumniData.workingLocation}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="experience"
            label="Experience"
            value={alumniData.experience}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            name="linkedin"
            label="LinkedIn"
            value={alumniData.linkedin}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="github"
            label="GitHub"
            value={alumniData.github}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="portfolio"
            label="Portfolio"
            value={alumniData.portfolio}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="facebook"
            label="Facebook"
            value={alumniData.facebook}
            onChange={handleInputChange}
            margin="normal"
          />

          <TextField
            fullWidth
            name="careerGoals"
            label="Career Goals"
            value={alumniData.careerGoals}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            name="achievements"
            label="Achievements"
            value={alumniData.achievements}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            name="skills"
            label="Skills"
            value={alumniData.skills}
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

export default AlumniProfileCard;
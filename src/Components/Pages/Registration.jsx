import React, {useState} from 'react'
import {Typography,Box,Button,TextField,Container,Grid2} from '@mui/material';

const Registration = () => {
    const [formData, setFormData] = useState({
    Name: '',
    eventname: '',
    email: '',
    phoneNumber: '',
    eventDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Add your form submission logic here
  };
  return (
    <Container maxWidth="sm">
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" style={{marginTop:"90px"}} color="primary" gutterBottom>
        Event Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        
          <Grid2 item xs={12} sm={6}>
            <TextField
              name="Name"
              label="Name"
              variant="outlined"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
              sx={{margin:2}} 
              required
            /><br />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              sx={{margin:2}} 
              required
              type="email"
            />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleChange}
              sx={{margin:2}} 
              required
              type="tel"
            />
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            <TextField
              name="eventname"
              label="Event Name"
              variant="outlined"
              fullWidth
              value={formData.eventname}
              onChange={handleChange}
              sx={{margin:2}} 
              required
            />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              name="eventDate"
              label="Event Date"
              variant="outlined"
              fullWidth
              value={formData.eventDate}
              onChange={handleChange}
              required
              sx={{margin:2}} 
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid2>
          <Grid2 item xs={12} style={{paddingLeft:"150px" , paddingRight:"150px"}}>
            <Button type="submit" variant="contained" sx={{margin:2}}  color="primary" fullWidth><br />
              Register
            </Button>
          </Grid2>
    
      </form>
    </Box>
  </Container>

  )
}

export default Registration

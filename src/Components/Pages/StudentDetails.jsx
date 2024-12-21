import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, TextField, CircularProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './App.css';

const steps = ['Personal Info', 'Academic Details', 'Skills & Links', 'Profile Setup'];

const StudentDetails = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeId: '',
    year: '',
    branch: '',
    phone: '',
    skills: '',
    description: '',
    github: '',
    linkedin: '',
    portfolio: '',
    avatar: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = { name: false, email: false };

    if (activeStep === 0) {
      if (!formData.name.trim()) {
        newErrors.name = true;
        isValid = false;
      }
      if (!formData.email.trim()) {
        newErrors.email = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateFields()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false }); // Clear error when user types
  };

  const handleSubmit = () => {
    console.log(formData);
    alert('Registration Successful!');
    navigate('/login');
  };

  const StepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              error={errors.name}
              helperText={errors.name ? 'Name is required' : ''}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              error={errors.email}
              helperText={errors.email ? 'Email is required' : ''}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ x: -100 }} animate={{ x: 0 }}>
            <TextField
              label="College ID"
              name="collegeId"
              value={formData.collegeId}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <TextField
              label="Skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="GitHub"
              name="github"
              value={formData.github}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="LinkedIn"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="Portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
            <TextField
              label="Avatar (URL)"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
            />
          </motion.div>
        );
      default:
        return <CircularProgress />;
    }
  };

  return (
    <div className="App">
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        <h1>Student Registration Form</h1>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2>All steps completed</h2>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StepContent />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </motion.div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default StudentDetails;

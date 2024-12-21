import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const steps = ["Personal Info", "Work Details", "Social Links & Goals", "Profile Setup"];

const StepContent = ({ activeStep, formData, handleChange }) => {
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
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
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
          <TextField
            label="Batch"
            name="batch"
            value={formData.batch}
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
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Working Location"
            name="workingLocation"
            value={formData.workingLocation}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Experience (Years)"
            name="experience"
            value={formData.experience}
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
          <TextField
            label="Facebook"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Career Goals"
            helperText="Describe your aspirations briefly."
            name="careerGoals"
            value={formData.careerGoals}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Achievements"
            name="achievements"
            value={formData.achievements}
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
            helperText="Enter the URL of your profile picture."
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            label="Skills"
            name="skills"
            value={formData.skills}
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

const AluminiDetails = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    batch: "",
    branch: "",
    phone: "",
    avatar: "",
    companyName: "",
    designation: "",
    workingLocation: "",
    experience: "",
    github: "",
    linkedin: "",
    portfolio: "",
    facebook: "",
    careerGoals: "",
    achievements: "",
    skills: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const isStepValid = () => {
    if (activeStep === 0 && (!formData.name || !formData.email)) {
      alert("Name and Email are required.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Send a POST request with formData to the API
      const response = await axios.post("http://localhost:8000/api/alumni/register", formData);
  
      // Log the response and display success message
      console.log("Response:", response.data);
      alert("Registration Successful!");
  
      // Navigate to the login page after successful registration
      navigate("/login");
    } catch (error) {
      // Handle errors and display an alert to the user
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again.");
    } finally {
      // Ensure loading state is cleared regardless of the outcome
      setIsLoading(false);
    }
  };
  

  return (
    <div className="App">
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <br /><br /><br />
        <h1>Alumni Registration Details</h1>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ marginBottom: 3, "& .MuiStepLabel-label": { fontSize: "1rem" } }}
        >
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
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StepContent
                activeStep={activeStep}
                formData={formData}
                handleChange={handleChange}
              />
              <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </motion.div>
          )}
        </div>
      </Box>
    </div>
  );
};

export default AluminiDetails;

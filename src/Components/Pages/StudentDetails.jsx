import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  CircularProgress,
  Box,
  Avatar,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = ["Personal Info", "Academic Details", "Contact Info", "Profile Setup"];

const branches = [
  "Computer Science Engineering",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Civil Engineering",
  "Mechanical Engineering",
  "Chemical Engineering",
];

const years = ["P1", "P2", "E1", "E2", "E3", "E4"];

const StepContent = ({ activeStep, formData, handleChange, handleAvatarChange, avatarPreview, errors }) => {
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
            helperText={errors.name && "Name is required."}
            error={Boolean(errors.name)}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
            helperText={errors.email && "Enter a valid email address."}
            error={Boolean(errors.email)}
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
            helperText="Password must be at least 8 characters."
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
            label="RGUKT ID NO."
            name="collegeId"
            value={formData.collegeId }
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          />
          <TextField
            select
            label="Year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          >
            {branches.map((branch) => (
              <MenuItem key={branch} value={branch}>
                {branch}
              </MenuItem>
            ))}
          </TextField>
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
          <Avatar
            src={avatarPreview || "https://via.placeholder.com/150"}
            sx={{ width: 100, height: 100, margin: "auto", marginBottom: 2 }}
          />
          <TextField
            label="Avatar (Upload)"
            helperText="Upload your profile picture."
            name="avatar"
            type="file"
            onChange={handleAvatarChange}
            fullWidth
            margin="dense"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </motion.div>
      );
    default:
      return <CircularProgress />;
  }
};

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    // batch: "",
    branch: "",
    phone: "",
    collegeId: "",
    // address: "",
    avatar: "",
    year: "",
    linkedin: "",
    github: "",
    portfolio: "",
    description: "",
    skills:"",
    userType:"student",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStepValid = () => {
    const newErrors = {};
    if (activeStep === 0) {
      if (!formData.name) newErrors.name = true;
      if (!formData.email || !isEmailValid(formData.email)) newErrors.email = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setFormData({ ...formData, avatar: file }); // Save file in formData
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result); // Optional: Display preview
    };
    reader.readAsDataURL(file);
  }
};


  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    try {
      // Log form data for debugging
      console.log(formData);
  
      // Send a POST request to the API
    // Create FormData object
    const formDataToSend = new FormData();

    // Append all fields from the formData object to FormData
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }

    // Send FormData to the backend
    const response = await fetch("http://localhost:8000/api/student/register", {
      method: "POST",
      body: formDataToSend, // Use FormData here
    });
  
      // Check for success response
      if (response.ok) {
        const data = await response.json(); // Parse response data
        console.log(data); // Optional: Log the API response
        alert("Registration Successful!");
        navigate("/login"); // Redirect to login page
      } else {
        const errorData = await response.json(); // Parse error response
        console.error("Error response:", errorData);
        alert(`Error: ${errorData.message || "Unable to register"}`);
      }
    } catch (error) {
      console.error("Request error:", error); // Log error
      alert("Error submitting data. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };
  

  return (
    <div className="App">
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
        <br /><br /><br />
        <h1>Student Registration Details</h1>
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
                handleAvatarChange={handleAvatarChange}
                avatarPreview={avatarPreview}
                errors={errors}
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

export default StudentRegistration;
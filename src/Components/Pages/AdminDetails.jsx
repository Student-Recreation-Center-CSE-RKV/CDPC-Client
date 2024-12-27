import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Box,
  Avatar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const steps = ["Personal Info", "Authentication", "Verification"];

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    avatar: "",
    username: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    adminAccessCode: "",
    userType: "admin",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(`Updating field: ${name}, New value: ${value}`);
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
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

  const validateStep = () => {
    const stepErrors = {};
    if (activeStep === 0) {
      if (!formData.name) stepErrors.name = "Full Name is required.";
      if (!formData.email) stepErrors.email = "Email is required.";
      if (!formData.phone) stepErrors.phone = "Phone Number is required.";
    }
    if (activeStep === 1) {
      if (!formData.username) stepErrors.username = "Username is required.";
      if (!formData.password) stepErrors.password = "Password is required.";
      if (formData.password !== formData.confirmPassword)
        stepErrors.confirmPassword = "Passwords do not match.";
    }
    if (activeStep === 2) {
      if (!formData.employeeId) stepErrors.employeeId = "Employee ID is required.";
      if (!formData.adminAccessCode)
        stepErrors.adminAccessCode = "Admin Access Code is required.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsLoading(true);
    console.log(formData);
    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }
    
    try {
      const response = await fetch("http://localhost:8000/api/admin/register", {
        method: "POST",
        body: formDataToSend,
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed.");
      }

      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        {activeStep === 0 && (
          <>
            <Typography variant="h6" align="center" gutterBottom>
              Personal Information
            </Typography>
            <Avatar
              src={avatarPreview || "https://via.placeholder.com/150"}
              sx={{ width: 100, height: 100, margin: "auto", marginBottom: 3 }}
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleAvatarChange}
              style={{
                display: "block",
                margin: "10px auto",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
            {errors.avatar && (
              <Typography color="error" variant="body2">
                {errors.avatar}
              </Typography>
            )}
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone}
              sx={{ marginBottom: 2 }}
            />
          </>
        )}
        {activeStep === 1 && (
          <>
            <Typography variant="h6" align="center" gutterBottom>
              Account Setup
            </Typography>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ marginBottom: 2 }}
            />
          </>
        )}
        {activeStep === 2 && (
          <>
            <Typography variant="h6" align="center" gutterBottom>
              Verification Details
            </Typography>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              fullWidth
              error={!!errors.employeeId}
              helperText={errors.employeeId}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Admin Access Code"
              name="adminAccessCode"
              value={formData.adminAccessCode}
              onChange={handleChange}
              fullWidth
              error={!!errors.adminAccessCode}
              helperText={errors.adminAccessCode}
              sx={{ marginBottom: 2 }}
            />
          </>
        )}
      </motion.div>
    );
  };

  return (

    <>
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2,marginTop:"65px" }}>
      <h1 style={{textAlign:"center"}}>Admin Registration</h1>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {renderStepContent()}
        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (activeStep === steps.length - 1) {
                handleSubmit(); // Call handleSubmit when "Finish" is clicked
              } else {
                handleNext(); // Proceed to the next step otherwise
              }
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress 
              size={70} 
              thickness={3} 
              color="primary" 
              sx={{ 
                color: 'green', // Custom color
                margin: 'auto', // Centering it within a container
                padding: 1, // Padding around the spinner
              }} 
            />
            
            ) : activeStep === steps.length - 1 ? (
              "Finish"
            ) : (
              "Next"
            )}
          </Button>
        </Box>
      </div>
    </Box>
    
    </>
  );
  
};

export default AdminRegistration;

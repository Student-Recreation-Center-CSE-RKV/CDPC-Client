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

const steps = ["Personal Info", "Authentication", "Verification"];

const AdminRegistration = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    avatar: "",
    username: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    adminAccessCode: "",
  });
  const [avatarPreview, setAvatarPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataToSend.append(key, value);
      }

      const response = await fetch("http://localhost:8000/api/admin/register", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Registration Successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Unable to register"}`);
      }
    } catch (error) {
      alert("Error submitting data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const StepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <Avatar
              src={avatarPreview || "https://via.placeholder.com/150"}
              sx={{ width: 100, height: 100, margin: "auto", marginBottom: 2 }}
            />
            <TextField
              label="Avatar (Upload)"
              name="avatar"
              type="file"
              onChange={handleAvatarChange}
              fullWidth
              margin="dense"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              required
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
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              required
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
           
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              required
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
              required
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              required
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              label="Employee ID"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              required
            />
            <TextField
              label="Admin Access Code"
              name="adminAccessCode"
              value={formData.adminAccessCode}
              onChange={handleChange}
              fullWidth
              margin="dense"
              size="small"
              required
            />
          </motion.div>
        );
      default:
        return <CircularProgress />;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <h1>Admin Registration</h1>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <StepContent />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </motion.div>
        )}
      </div>
    </Box>
  );
};

export default AdminRegistration;

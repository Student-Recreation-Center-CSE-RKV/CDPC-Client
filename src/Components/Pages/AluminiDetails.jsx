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

const steps = ["Personal Info", "Work Details", "Social Links & Goals", "Profile Setup"];

const branches = ["Computer Science Engineering", "Electronics and Communication Engineering", "Electrical and Electronics Engineering", "Civil Engineering", "Mechanical Engineering", "Chemical Engineering"];
const batches = ["2008", "2009", "2010", "2011", "2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"];

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
            helperText={errors.name && " Name is required."}
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
            select
            label="Batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
          >
            {batches.map((batch) => (
              <MenuItem key={batch} value={batch}>
                {batch}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="RGUKT ID NO."
            name="id"
            value={formData.id || "R20xxxxx"}
            onChange={handleChange}
            fullWidth
            margin="dense"
            size="small"
            
          />
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
            helperText={errors.companyName && "Company Name is required."}
            error={Boolean(errors.companyName)}
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
            helperText={errors.linkedin && "LinkedIn profile is required."}
            error={Boolean(errors.linkedin)}
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
    } else if (activeStep === 1) {
      if (!formData.companyName) newErrors.companyName = true;
    } else if (activeStep === 2) {
      if (!formData.linkedin) newErrors.linkedin = true;
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log(formData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      alert("Error submitting data. Please try again.");
    } finally {
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

export default AluminiDetails;
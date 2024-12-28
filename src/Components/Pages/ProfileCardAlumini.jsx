import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Collapse,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ProfileCardAlumini = () => {
  const [expandedField, setExpandedField] = useState(null);
  const [fieldValues, setFieldValues] = useState({
    name: "",
    email: "",
    batch: "",
    branch: "",
    phone: "",
    avatar: null,
    companyDetails: "",
    designation: "",
    workingLocation: "",
    experience: "",
    linkedin: "",
    github: "",
    portfolio: "",
    facebook: "",
    careerGoals: "",
    achievements: "",
    skills: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null); // State to show photo preview

  const handleExpand = (field) => {
    setExpandedField(expandedField === field ? null : field);
  };

  const handleSave = (field) => {
    setExpandedField(null);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValues({ ...fieldValues, avatar: file });
      setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL for the uploaded photo
    }
  };

  const triggerFileInput = () => {
    // Trigger the hidden file input when the avatar is clicked
    document.getElementById("photo-upload").click();
  };

  // Use media query to check screen size
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row", // Stack vertically on small screens
        maxWidth: "100%",
        mx: "auto",
        mt: 4,
        p: 4,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        flexWrap: "wrap", // Ensure that components wrap on small screens
      }}
    >
      {/* Profile Photo Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          mr: isSmallScreen ? 0 : 4, // No margin on small screens
          mb: isSmallScreen ? 3 : 0, // Margin bottom on small screens
        }}
      >
        <Avatar
          alt="Profile Photo"
          src={photoPreview || "https://via.placeholder.com/150"}
          sx={{
            width: isSmallScreen ? 200 : 250, // Smaller avatar on small screens
            height: isSmallScreen ? 200 : 250,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
          onClick={triggerFileInput} // Trigger file input when avatar is clicked
        />
        {/* Hidden input for file upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
          id="photo-upload"
        />
        <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
          {fieldValues.name || "User Name"}
        </Typography>
      </Box>

      {/* Fields Section */}
      <Box sx={{ flex: 5 }}>
        {[
          { label: "Name", field: "name" },
          { label: "Email", field: "email" },
          { label: "Batch", field: "batch" },
          { label: "Branch", field: "branch" },
          { label: "Phone", field: "phone" },
          { label: "Company Details", field: "companyDetails" },
          { label: "Designation", field: "designation" },
          { label: "Working Location", field: "workingLocation" },
          { label: "Experience", field: "experience" },
          { label: "LinkedIn", field: "linkedin" },
          { label: "GitHub", field: "github" },
          { label: "Portfolio", field: "portfolio" },
          { label: "Facebook", field: "facebook" },
          { label: "Career Goals", field: "careerGoals" },
          { label: "Achievements", field: "achievements" },
          { label: "Skills", field: "skills" },
        ].map(({ label, field }) => (
          <Box
            key={field}
            sx={{
              mb: 3,
              p: 3,
              border: "1px solid #ddd",
              borderRadius: 2,
              backgroundColor: "#f9f9f9",
              position: "relative",
            }}
          >
            {/* Field Heading and Add Icon */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{label}</Typography>
              <IconButton onClick={() => handleExpand(field)}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* Field Content or Input */}
            <Collapse in={expandedField === field}>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label={`Enter ${label}`}
                  value={fieldValues[field]}
                  onChange={(e) =>
                    setFieldValues({ ...fieldValues, [field]: e.target.value })
                  }
                  multiline={field === "careerGoals" || field === "achievements" || field === "skills"}
                  rows={field === "careerGoals" || field === "achievements" || field === "skills" ? 4 : 1}
                />
                <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setExpandedField(null)}
                    sx={{ mr: 2 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSave(field)}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </Collapse>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileCardAlumini;
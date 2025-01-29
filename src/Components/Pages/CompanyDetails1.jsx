import React,{useState,useEffect} from 'react';
import { Box, Typography, Grid, Divider, Button, Chip, IconButton,Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,CircularProgress } from '@mui/material';
import { Edit, Delete, PhotoCamera } from '@mui/icons-material';
import EditCompanyForm from './EditCompanyForm';
import axios from 'axios';
const CompanyDetails = ({ company, onBack }) => {
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [companyInfo, setCompanyInfo] = useState(null); // State to store company details
//   const [companyId,setCompanyId]=useState("");
  const [isUploading,setIsUploadig]=useState(false);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const [open, setOpen] = useState(false); // Dialog open state
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const [preview, setPreview] = useState(""); // State for image preview
  const handleDialogOpen = () => setOpen(true);
  const handleDialogClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreview("");
  };
    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedFile(file);
          setPreview(URL.createObjectURL(file)); // Generate preview URL
        }
      };
    // Handle delete functionality
    const onDelete = async () => {
        // Ask for confirmation before deleting
        const confirmDelete = window.confirm("Are you sure you want to delete this company?");
        if (!confirmDelete) return; // Exit if the user cancels the deletion
      
        try {
          // Send a DELETE request to the API endpoint with credentials
          await axios.delete(
            `http://localhost:8000/api/companies/delete/${company._id}`,
            { withCredentials: true } // Include credentials (cookies, tokens, etc.)
          );
      
          // Show success alert
          alert("Company deleted successfully!");
      
          // Call the onBack function to navigate back or refresh the list
          if (onBack) onBack();
        } catch (err) {
          // Handle errors
          setError(err.message || "Failed to delete company");
          alert("Failed to delete company. Please try again.");
        }
      };
    // console.log(company);
    const handleEditClick = () => {
        setIsEditing(true);
      };
    
      const handleEditClose = () => {
        setIsEditing(false);
      };

      const handleUpdateLogo = async () => {
        if (!selectedFile) {
          alert("Please select a logo to upload.");
          return;
        }
        setIsUploadig(true);
        const formData = new FormData();
        formData.append("logo", selectedFile);
      
        const url = `http://localhost:8000/api/companies/update-logo/${company._id}`;
        // console.log("Constructed URL:", url);
        // console.log("Selected File:", selectedFile);
      
        try {
          const response = await axios.patch(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
          console.log(response);
          if (response.status === 200) {
            alert("Logo updated successfully!");
            setCompanyInfo(response.data.data);
          } else {
            alert("Failed to update logo. Please try again.");
          }
        } catch (error) {
          console.error("Error updating logo:", error);
          alert("An error occurred while updating the logo.");
        }finally{
            handleDialogClose();
            setIsUploadig(false);
        }
      };
      
      
     // Fetch company details from API
     useEffect(() => {
        if (!company || !company._id) {
          // If company or company._id is invalid, return early and don't fetch data
          setLoading(false);
          return;
        }
    
        const fetchCompanyDetails = async () => {
          try {
            setLoading(true);
            const response = await axios.get(
              `http://localhost:8000/api/companies/id/${company._id}`
            );
            setCompanyInfo(response.data.data);
          } catch (err) {
            setError(err.message || "Failed to fetch company details");
          } finally {
            setLoading(false);
          }
        };
    
        fetchCompanyDetails();
      }, [company]); // Watch for changes to the `company` prop
    
if (!company) return null;
  if (loading) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }
  return (
    <Box
    sx={{
        padding: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        minHeight: "70vh",
        mt: -4,
    }}
    >
    {isEditing ? (
        <EditCompanyForm company={company} onClose={handleEditClose} />
    ) : (
        <>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Company Details
        </Typography>

        {/* Back Button */}
        <Button variant="outlined" onClick={onBack} sx={{ mb: 3 }}>
            Back
        </Button>

        {/* Top Section: Logo and Name */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
            {/* Logo with Update Icon */}
            <Grid item xs={12} sm={4} md={3}>
            <Box
                sx={{
                position: "relative",
                width: "100%",
                height: "150px",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                border: "1px solid #e0e0e0",
                }}
            >
                <img
                src={companyInfo?.logo || ""}
                alt={companyInfo?.name}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                }}
                />
                <IconButton
                onClick={handleDialogOpen}
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
                }}
                >
                <PhotoCamera />
                </IconButton>

            </Box>
                {/* Dialog for Logo Update */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Update Logo</DialogTitle>
        <DialogContent>
          <Typography>Choose a new logo to upload:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginTop: "10px" }}
          />
          {preview && (
            <Box
              sx={{
                marginTop: 2,
                width: "100%",
                height: 200,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px dashed gray",
              }}
            >
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDialogClose} color="secondary" disabled={isUploading}>
            Cancel
        </Button>
        <Button
            onClick={handleUpdateLogo}
            color="primary"
            disabled={!selectedFile || isUploading}
            startIcon={isUploading && <CircularProgress size={20} color="inherit" />}
        >
            {isUploading ? "Uploading..." : "Update"}
        </Button>
        </DialogActions>
      </Dialog>
            </Grid>

            {/* Name, Industry, and Action Icons */}
            <Grid
            item
            xs={12}
            sm={8}
            md={9}
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}
            >
            <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {companyInfo?.name || "N/A"}
                </Typography>
                <Typography variant="h6" sx={{ color: "gray" }}>
                Industry: {companyInfo?.industry || "N/A"}
                </Typography>
            </Box>
            <Box>
                {/* Edit and Delete Icons */}
                <IconButton onClick={handleEditClick} color="primary">
                <Edit />
                </IconButton>
                <IconButton onClick={onDelete} color="error">
                <Delete />
                </IconButton>
            </Box>
            </Grid>
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Additional Details */}
        <Grid container spacing={3}>
            {/* Locations */}
            <Grid item xs={12} sm={6} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Locations
            </Typography>
            {companyInfo?.locations?.length ? (
                companyInfo?.locations.map((location, index) => (
                <Chip key={index} label={location} sx={{ mr: 1, mt: 1 }} />
                ))
            ) : (
                <Typography>No locations available</Typography>
            )}
            </Grid>

            {/* Contact Details */}
            <Grid item xs={12} sm={6} sx={{ mb: 4, textAlign: "left" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Contact Details
            </Typography>
            <Typography>Email: {companyInfo?.contactDetails?.email || "N/A"}</Typography>
            <Typography>Phone: {companyInfo?.contactDetails?.phone || "N/A"}</Typography>
            <Typography>
                Website:{" "}
                {companyInfo?.website ? (
                <a href={companyInfo?.website} target="_blank" rel="noopener noreferrer">
                    {companyInfo?.website}
                </a>
                ) : (
                "N/A"
                )}
            </Typography>
            <Typography>Headquarters: {companyInfo?.headquarters || "N/A"}</Typography>
            </Grid>

            {/* Hiring Pattern and Placement Stats */}
            <Grid container spacing={3}>
            {/* Hiring Pattern */}
            <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Hiring Pattern
                </Typography>
                <Typography>
                Preferred Skills:{" "}
                {companyInfo?.hiringPattern?.preferredSkills?.join(", ") || "N/A"}
                </Typography>
                <Typography>
                Preferred Departments:{" "}
                {companyInfo?.hiringPattern?.preferredDepartments?.join(", ") || "N/A"}
                </Typography>
            </Grid>

            {/* Placement Stats */}
            <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Placement Stats
                </Typography>
                <Typography>Total Hired: {companyInfo?.placementStats?.totalHired || 0}</Typography>
                <Typography>
                Average Salary: ₹{companyInfo?.placementStats?.avgSalary || "N/A"}
                </Typography>
                <Typography>
                Highest Salary: ₹{companyInfo?.placementStats?.highestSalary || "N/A"}
                </Typography>
                <Typography>
                Lowest Salary: ₹{companyInfo?.placementStats?.lowestSalary || "N/A"}
                </Typography>
            </Grid>
            </Grid>

            {/* Alumni Profiles */}
            <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Alumni Profiles
            </Typography>
            {companyInfo?.alumniProfiles?.length ? (
                companyInfo?.alumniProfiles.map((alumni, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Typography>Name: {alumni.name}</Typography>
                    <Typography>Position: {alumni.position}</Typography>
                    <Typography>Batch Year: {alumni.batchYear}</Typography>
                    <Typography>
                    LinkedIn:{" "}
                    <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
                        {alumni.linkedin}
                    </a>
                    </Typography>
                </Box>
                ))
            ) : (
                <Typography>No alumni profiles available</Typography>
            )}
            </Grid>

            {/* Interview Experiences */}
            <Grid item xs={12}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Interview Experiences
            </Typography>
            {companyInfo?.interviewExperiences?.length ? (
                companyInfo?.interviewExperiences.map((experience, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                    <Typography>
                    Person: {experience.person} ({experience.date})
                    </Typography>
                    <Typography>Comment: {experience.comment}</Typography>
                    <Typography>
                    LinkedIn:{" "}
                    <a href={experience.linkedin} target="_blank" rel="noopener noreferrer">
                        {experience.linkedin}
                    </a>
                    </Typography>
                    <Typography>Rounds:</Typography>
                    {experience.rounds.map((round, idx) => (
                    <Typography key={idx}>
                        Round {round.roundNumber} - {round.description} (
                        {round.difficulty})
                    </Typography>
                    ))}
                </Box>
                ))
            ) : (
                <Typography>No interview experiences available</Typography>
            )}
            </Grid>
        </Grid>
        </>
    )}
    </Box>

  );
};

export default CompanyDetails;

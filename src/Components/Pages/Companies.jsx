import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
//   IconButton,
  Chip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import axios from "axios";
import CompanyDetails from "./CompanyDetails1";
const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [isUploading,setIsUploadig] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    locations: [],
    website: "",
    headquarters: "",
    logo: null,
    email: "",
    phone: "",
    preferredSkills: [],
    preferredDepartments: [],
  });
  const [tempInput, setTempInput] = useState({ field: "", value: "" });
  const [logoPreview, setLogoPreview] = useState(null); // To store the logo preview
  const [selectedCompany, setSelectedCompany] = useState(null);
  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleBack = () => {
    setSelectedCompany(null);
    fetchCompanies();
  };
  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/companies");
      setCompanies(response.data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleArrayChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: Array.isArray(prevData[field])
        ? [...prevData[field], value] // Append to the array
        : [value], // Initialize as an array with the new value
    }));
    setTempInput({ field: "", value: "" });
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
            ...prevData,
            logo: file, // Store the file object in formData for submission
          }));
        setLogoPreview(reader.result); // Set the image preview
      };
    //   console.log(file);
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    setIsUploadig(true);
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => form.append(key, item));
      } else {
        form.append(key, formData[key]);
      }
    });

    // console.log(formData);
    try {
        const response= await axios.post(
          "http://localhost:8000/api/companies/create-company", 
          form, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // This includes credentials (e.g., cookies or auth tokens)
          }
        );
        console.log(response);
        alert("Company added successfully!");
        setFormData({});
        fetchCompanies();
        setOpenDialog(false);
      } catch (error) {
        console.error("Error adding company:", error);
        alert("something went wrong ! please Try again");
      }finally{
        setIsUploadig(false);
      }
      
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        minHeight: "70vh",
        textAlign: "center",
      }}
    >
    {selectedCompany ? (
    // Render the separate component for company details
    <CompanyDetails company={selectedCompany} onBack={handleBack} />
    ) : (
    <>
        <Typography variant="h4" sx={{ mb: 4 }}>
        Our Partner Companies
        </Typography>

        <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 4 }}
        >
        Add New Company
        </Button>

        {loading ? (
        <CircularProgress />
        ) : (
        <Grid container spacing={3}>
            {companies.map((company) => (
            <Grid item xs={12} sm={6} md={3} key={company?._id}>
                <Box
                onClick={() => handleCompanyClick(company)} // Attach click handler
                sx={{
                    cursor: "pointer",
                    width: "150px",
                    height: "150px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    border: "1px solid #e0e0e0",
                    transition: "transform 0.2s",
                    "&:hover": {
                    transform: "scale(1.05)",
                    },
                }}
                >
                <img
                    src={company.logo}
                    alt={company.name}
                    style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    }}
                />
                </Box>
                <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                {company.name}
                </Typography>
            </Grid>
            ))}
        </Grid>
        )}
    </>
    )}


      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Headquarters"
            name="headquarters"
            value={formData.headquarters}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          {/* Locations */}
          <TextField
            fullWidth
            label="Add Location"
            value={tempInput.field === "locations" ? tempInput.value : ""}
            onChange={(e) =>
              setTempInput({ field: "locations", value: e.target.value })
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              tempInput.value &&
              handleArrayChange("locations", tempInput.value)
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            {formData.locations?.map((location, index) => (
              <Chip
                key={index}
                label={location}
                onDelete={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    locations: prevData.locations.filter(
                      (_, i) => i !== index
                    ),
                  }))
                }
                sx={{ mr: 1 }}
              />
            ))}
          </Box>

          {/* Skills */}
          <TextField
            fullWidth
            label="Add Skill"
            value={tempInput.field === "preferredSkills" ? tempInput.value : ""}
            onChange={(e) =>
              setTempInput({ field: "preferredSkills", value: e.target.value })
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              tempInput.value &&
              handleArrayChange("preferredSkills", tempInput.value)
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            {formData.preferredSkills?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    preferredSkills: prevData.preferredSkills.filter(
                      (_, i) => i !== index
                    ),
                  }))
                }
                sx={{ mr: 1 }}
              />
            ))}
          </Box>

          {/* Departments */}
          <TextField
            fullWidth
            label="Add Department"
            value={
              tempInput.field === "preferredDepartments"
                ? tempInput.value
                : ""
            }
            onChange={(e) =>
              setTempInput({
                field: "preferredDepartments",
                value: e.target.value,
              })
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              tempInput.value &&
              handleArrayChange("preferredDepartments", tempInput.value)
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            {formData.preferredDepartments?.map((dept, index) => (
              <Chip
                key={index}
                label={dept}
                onDelete={() =>
                  setFormData((prevData) => ({
                    ...prevData,
                    preferredDepartments: prevData.preferredDepartments.filter(
                      (_, i) => i !== index
                    ),
                  }))
                }
                sx={{ mr: 1 }}
              />
            ))}
          </Box>

          <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1,fontWeight:600 }}>
            Logo
        </Typography>
        <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ marginBottom: "16px" }}
        />
        </Box>
        {logoPreview && (
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2" sx={{ mb: 1 }}>
            Preview:
          </Typography>
          <img
            src={logoPreview}
            alt="Logo Preview"
            style={{
              maxWidth: "150px",
              maxHeight: "150px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
            }}
          />
        </Box>
      )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {isUploading ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isUploading} // Disable button while uploading
        >
          Submit
        </Button>
      )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Companies;

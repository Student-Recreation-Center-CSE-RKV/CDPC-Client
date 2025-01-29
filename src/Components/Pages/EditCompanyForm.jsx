import React, { useState } from "react";
import {
  TextField,
  Chip,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
const EditCompanyForm = ({ company, onClose }) => {
    const[isUploading,setIsUploadig]=useState(false);
  const [formData, setFormData] = useState({
    ...company,
    contactDetails: company.contactDetails || { email: "", phone: "" },
    hiringPattern: company.hiringPattern || { preferredSkills: [], preferredDepartments: [] },
    locations: company.locations || [],
  });
  const [tempInput, setTempInput] = useState({ field: "", value: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields dynamically
    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData((prev) => {
      const targetArray = field.split(".");
      if (targetArray.length === 1) {
        // Top-level array
        return { ...prev, [field]: [...(prev[field] || []), value] };
      }
      // Nested array
      return {
        ...prev,
        [targetArray[0]]: {
          ...prev[targetArray[0]],
          [targetArray[1]]: [...(prev[targetArray[0]][targetArray[1]] || []), value],
        },
      };
    });
    setTempInput({ field: "", value: "" });
  };

  const handleArrayDelete = (field, index) => {
    setFormData((prev) => {
      const targetArray = field.split(".");
      if (targetArray.length === 1) {
        // Top-level array
        return { ...prev, [field]: prev[field].filter((_, i) => i !== index) };
      }
      // Nested array
      return {
        ...prev,
        [targetArray[0]]: {
          ...prev[targetArray[0]],
          [targetArray[1]]: prev[targetArray[0]][targetArray[1]].filter((_, i) => i !== index),
        },
      };
    });
  };

  const handleSubmit = async () => {
    setIsUploadig(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/companies/update/${formData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies if necessary
        }
      );
      setFormData(response.data.data);
    //   console.log("Update successful:", response.data.data);
      alert("Company details updated successfully!");
    } catch (error) {
      console.error("Failed to update company details:", error);
      alert("Failed to update company details. Please try again.");
    }finally{
        setIsUploadig(false);
    }
  };

  return (
    <form>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4 }}>
        Edit Company Details
      </Typography>
      <TextField
        fullWidth
        label="Company Name"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Industry"
        name="industry"
        value={formData.industry || ""}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Website"
        name="website"
        value={formData.website || ""}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Headquarters"
        name="headquarters"
        value={formData.headquarters || ""}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Email"
        name="contactDetails.email"
        value={formData.contactDetails.email || ""}
        onChange={handleInputChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Phone"
        name="contactDetails.phone"
        value={formData.contactDetails.phone || ""}
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
        {formData.locations.map((location, index) => (
          <Chip
            key={index}
            label={location}
            onDelete={() => handleArrayDelete("locations", index)}
            sx={{ mr: 1 }}
          />
        ))}
      </Box>

      {/* Preferred Skills */}
      <TextField
        fullWidth
        label="Add Skill"
        value={tempInput.field === "hiringPattern.preferredSkills" ? tempInput.value : ""}
        onChange={(e) =>
          setTempInput({ field: "hiringPattern.preferredSkills", value: e.target.value })
        }
        onKeyDown={(e) =>
          e.key === "Enter" &&
          tempInput.value &&
          handleArrayChange("hiringPattern.preferredSkills", tempInput.value)
        }
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        {formData.hiringPattern.preferredSkills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() =>
              handleArrayDelete("hiringPattern.preferredSkills", index)
            }
            sx={{ mr: 1 }}
          />
        ))}
      </Box>

      {/* Preferred Departments */}
      <TextField
        fullWidth
        label="Add Department"
        value={tempInput.field === "hiringPattern.preferredDepartments" ? tempInput.value : ""}
        onChange={(e) =>
          setTempInput({ field: "hiringPattern.preferredDepartments", value: e.target.value })
        }
        onKeyDown={(e) =>
          e.key === "Enter" &&
          tempInput.value &&
          handleArrayChange("hiringPattern.preferredDepartments", tempInput.value)
        }
        sx={{ mb: 2 }}
      />
      <Box sx={{ mb: 2 }}>
        {formData.hiringPattern.preferredDepartments.map((dept, index) => (
          <Chip
            key={index}
            label={dept}
            onDelete={() =>
              handleArrayDelete("hiringPattern.preferredDepartments", index)
            }
            sx={{ mr: 1 }}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isUploading}
          sx={{ width: "20%", fontSize: "0.875rem" }}
        >
          {isUploading ? <CircularProgress size={24} /> : "Save"}
        </Button>

        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ width: "20%", fontSize: "0.875rem" }}
        >
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default EditCompanyForm;

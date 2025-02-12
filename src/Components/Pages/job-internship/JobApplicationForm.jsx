import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
const JobApplicationForm = ({ job, onClose }) => {
  const [email, setEmail] = useState("");
  const [applicant, setApplicant] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    applicantId: applicant?.applicantId||"",
    name: applicant?.name||"",
    email: applicant?.email||"",
    phone: applicant?.phone||"",
    department:applicant?.department|| "",
    gender: applicant?.gender||"",
    dob: applicant?.dob||"",
    address: applicant?.address||"",
    cgpa: applicant?.cgpa||"",
    resumeLink: applicant?.resumeLink||"",
    skills: applicant?.skills||[],
  });
  const handleEditClick =async () => {
    
    try {
      const response = await axios.get(`http://localhost:8000/api/applicants/get/id/${applicant._id}`);
      // console.log(response.data);
      setFormData(response.data.data)
      // setApplicant(response.data.data);
    } catch (error) {
      alert("something went wrong");
      console.log(error);
    }
    // console.log(applicant);
    setIsEditing(true);
    
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData(applicant); // Reset to original applicant details
  };

  const searchApplicant = async () => {
    if (!email || email.trim() === "") {
      alert("Please enter a valid email.");
      return; // Exit the function if the email is invalid
    }
    try {
      const response = await axios.get(`http://localhost:8000/api/applicants/get/${email}`);
      setApplicant(response.data.data);
      // console.log(response.data.data);
      setNotFound(false);
    } catch (error) {
      setApplicant(null);
      setNotFound(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(',').map((item) => item.trim()),
    }));
};
const handleEditApplicant = async () => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/applicants/edit/id/${formData._id}`, // Use formData._id to dynamically update the correct applicant
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setApplicant(response.data.data);
    // console.log("Applicant updated successfully:", response.data);
    alert("Applicant details updated successfully!");
    setIsEditing(false);
  } catch (error) {
    console.error("Error updating applicant:", error);
    alert("Failed to update applicant. Please try again.");
  }
};

const createApplicant = async () => {
  try {
    console.log(formData);

    const response = await axios.post(
      "http://localhost:8000/api/applicants/create",
      formData,
      {
        withCredentials: true, // Include credentials (cookies, auth headers)
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    alert("Applicant created successfully");
    // console.log("Applicant created successfully:", response.data.data);
    setNotFound(false);
    setApplicant(response.data.data);
    setEmail(response.data.data.email);
  } catch (error) {
    console.error("Error creating applicant", error.response?.data || error);
  }
};

  const applyForJob = async () => {
    try {
      await axios.post("http://localhost:8000/api/application/create", {
        applicantId: applicant._id,
        jobId: job._id,
      }, { withCredentials: true });

      alert("Application submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error applying for job", error);
    }
  };

  return (
    <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark overlay
      zIndex: 999, // Ensure it's on top
    }}
  >

        <Box sx={{ position: 'absolute',
      
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)', // Center the component vertically and horizontally
      backgroundColor: 'white',
      boxShadow: 3,
      borderRadius: 2,
      p: 4,
      maxWidth: {md:"90%",xs:"100%"},
      width: '100%',
      zIndex: 1000, // Ensure it stays above the overlay
       }}>
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            <IconButton onClick={onClose} color="primary">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" gutterBottom>
            Apply for {job?.title} at {job?.company?.name}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Enter Email to Search"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              onClick={searchApplicant}
              variant="contained"
              color="primary"
              fullWidth
            >
              Search Applicant
            </Button>
          </Box>

          {applicant && 
            <Box sx={{ position: 'relative', border: 1, borderColor: 'grey.300', p: 2, borderRadius: 1, backgroundColor: 'grey.100' }}>
            {!isEditing ? (
              <>
                <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <IconButton onClick={handleEditClick} color="primary">
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography variant="h6">Applicant Found</Typography>
                <Typography><strong>Name:</strong> {applicant.name}</Typography>
                <Typography><strong>Email:</strong> {applicant.email}</Typography>
                <Typography><strong>Phone:</strong> {applicant.phone}</Typography>
                <Typography><strong>Department:</strong> {applicant.department}</Typography>
                <Button onClick={applyForJob} variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
                  Submit Application
                </Button>
              </>
            ) : (
              <Box sx={{mt:{md:"40%",xs:"30%",sm:"70%"}}}>
                <Typography variant="h6" sx={{textAlign:"center",fontWeight:"bold",mt:2}}>Edit Applicant Details</Typography>
                <TextField
                  label="Applicant ID"
                  name="applicantId"
                  value={formData.applicantId}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    onChange={handleChange}
                    value={formData.department || ""}
                    label="Department"
                  >
                    <MenuItem value="Computer Science and Engineering">Computer Science and Engineering</MenuItem>
                    <MenuItem value="Electronics and Communication Engineering">Electronics and Communication Engineering</MenuItem>
                    <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                    <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                    <MenuItem value="Chemical Engineering">Chemical Engineering</MenuItem>
                    <MenuItem value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</MenuItem>
                    <MenuItem value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender || ""}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.dob ? formData.dob.slice(0, 10) : ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    shrink: true, // Ensures label doesn't overlap the date picker
                  }}
                />
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="CGPA"
                  name="cgpa"
                  type="number"
                  value={formData.cgpa || ""}
                  onChange={(e) => {
                    let value = e.target.value;
                    let floatValue = parseFloat(value);
      
                    if (value === "" || (floatValue >= 1 && floatValue <= 10)) {
                      handleChange(e);
                    }
                  }}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                  inputProps={{ min: 1, max: 10, step: 0.1 }}
                />
                <TextField
                  label="Resume Link"
                  name="resumeLink"
                  value={formData.resumeLink || ""}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Skills (comma separated)"
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={handleArrayChange}
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button onClick={handleEditApplicant} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Save Applicant
                </Button>
                <Button onClick={handleCancelClick} color="secondary" fullWidth sx={{ mt: 2 }}>
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
          }

          {notFound && (
            <Box sx={{ border: 1, borderColor: 'grey.300', p: 2, mt:{xs:"30%",sm:"65%",md:"40%"}, borderRadius: 1 }}>
              <Typography variant="h6" sx={{textAlign:"center",fontWeight:"bold"}}>New Applicant Details</Typography>
             
              
              <TextField label="Applicant ID" name="applicantId" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
              <TextField label="Email" name="email" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
              <TextField label="Name" name="name" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
              <TextField label="Phone" name="phone" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Department</InputLabel>
                <Select name="department" onChange={handleChange} label="Department" value={formData.department || ""}>
                  <MenuItem value="Computer Science and Engineering">Computer Science and Engineering</MenuItem>
                  <MenuItem value="Electronics and Communication Engineering">Electronics and Communication Engineering</MenuItem>
                  <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
                  <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
                  <MenuItem value="Chemical Engineering">Chemical Engineering</MenuItem>
                  <MenuItem value="Metallurgical and Materials Engineering">Metallurgical and Materials Engineering</MenuItem>
                  <MenuItem value="Electrical and Electronics Engineering">Electrical and Electronics Engineering</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" onChange={handleChange} label="Gender" value={formData.gender || ""} >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              {/* <TextField label="Gender" name="gender" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} /> */}
              <TextField label="Date of Birth" name="dob" type="date" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }}  InputLabelProps={{
                shrink: true, // Ensures label doesn't overlap the date picker
              }}/>
              <TextField label="Address" name="address" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
              <TextField
              label="CGPA"
              name="cgpa"
              type="number"
              onChange={(e) => {
                let value = e.target.value;
                let floatValue = parseFloat(value);

                // Allow empty input or values within the valid range
                if (value === "" || (floatValue >= 1 && floatValue <= 10)) {
                  handleChange(e);
                }
              }}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              inputProps={{ min: 1, max: 10, step: 0.1 }} // Allows decimal values like 7.5, 9.3
            />

              <TextField label="Resume Link" name="resumeLink" onChange={handleChange} fullWidth variant="outlined" sx={{ mb: 2 }} />
              <TextField label="Skills (comma separated)" name="skills" value={formData.skills.join(', ')} onChange={handleArrayChange} sx={{ mb: 2 }}fullWidth />
            
              <Button onClick={createApplicant} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Create Applicant
              </Button>
              <Button onClick={onClose} color="secondary" fullWidth sx={{mt:2}}>
                Cancel
              </Button>
              {/* <Box sx={{position: 'relative',left:{md:"90%",xs:"40%"}}}>
                <IconButton onClick={onClose} color="primary">
                  <CloseIcon />
                </IconButton>
                </Box> */}
            </Box>
          )}
        </Box>
    </Box>
  );
};

export default JobApplicationForm;

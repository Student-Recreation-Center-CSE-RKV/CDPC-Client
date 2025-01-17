import React, { useState ,useEffect} from "react";
import { Grid, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import JobCard from "./JobCard";
// import jobs from "./JobsList";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const JobList = (props) => {
  const { bgColor, jobType, heading, userType, mt } = props;
  
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    salaryRange: "",
    deadline: "",
  });
  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/jobs-internships/get-job-posts",
          {
            method: "GET",
            credentials: "include", // Include credentials if needed
          }
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data.message);
          setJobs(data.message || []); // Assuming the API response has a `jobs` array
        } else {
          console.error("Failed to fetch jobs:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array ensures the fetch runs only on mount
  console.log(jobs);
  const handleAddJob = () => {
    setOpen(true); // Open the dialog box
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog box
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/add-job-post", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Job Data Submitted Successfully:", result);
      
        alert("Job added successfully!");
      } else {
        const error = await response.json();
        console.error("Error submitting job data:", error);
        alert("Failed to add job. Please try again.");
      }
    } catch (error) {
      console.error("Network error while submitting job data:", error);
      alert("A network error occurred. Please check your connection and try again.");
    } finally {
      setFormData({
        title: "",
        company: "",
        description: "",
        location: "",
        salaryRange: "",
        deadline: "",
      });
      setOpen(false); // Close the dialog after submission
    }
  };
  

  return (
    <div
      style={{
        padding: "20px",
        color: "black",
        marginTop: mt || "60px",
        backgroundColor: bgColor,
      }}
    >
      <h1 style={{ textAlign: "center" }}>{heading}</h1>

      {/* Show Add Job button only for admins */}
      {userType === "admin" &&(
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddJob}
            style={{ backgroundColor: "#007bff", color: "#fff" }}
          >
            <AddCircleOutlineIcon   sx={{ marginRight: 1 }} />
            Add New Job
          </Button>
        </div>
      )}

<Grid
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "50px",
        }}
        className="job-list"
        container
        spacing={2}
        justifyContent="center"
      >
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job}  jobType={jobType}/>)
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No jobs available</p>
        )}
      </Grid>

     {/* Dialog for adding new job */}
     <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm" // Options: 'xs', 'sm', 'md', 'lg', 'xl'
          PaperProps={{
            style: {
              borderRadius: 10,
              padding: "15px",
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontSize: "1.4rem",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <AddCircleOutlineIcon color="primary" />
            Add New Job
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              paddingTop: "15px",
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              margin="dense"
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              margin="dense"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              size="small"
            />
            <TextField
              margin="dense"
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              margin="dense"
              label="Salary Range"
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              size="small"
            />
            <TextField
              margin="dense"
              label="Deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              size="small"
            />
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "space-between",
              padding: "10px 20px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Button
              onClick={handleClose}
              color="secondary"
              variant="outlined"
              size="small"
              sx={{ textTransform: "capitalize", display: "flex", gap: "5px" }}
            >
              <CancelIcon />
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              color="primary"
              variant="contained"
              size="small"
              sx={{
                backgroundColor: "#007bff",
                color: "#fff",
                textTransform: "capitalize",
                display: "flex",
                gap: "5px",
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              <CheckCircleIcon />
              Submit
            </Button>
          </DialogActions>
        </Dialog>

    </div>
  );
};

export default JobList;

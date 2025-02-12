import React, { useEffect, useState } from "react";

import axios from "axios";
import { Container, Typography, Grid, Box, CircularProgress,Button } from "@mui/material";
import JobCard from "./job-internship/JobCard";
import JobDetails from "./job-internship/JobDetails";
import EditableJobDetails from "./job-internship/EditableJobDetails";
import AddJobForm from "./job-internship/AddJobForm";
import { useAuth } from "../AuthContext";
const JobAndInternships = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [EditSelectedJob,setEditSelectedJob]=useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const {user}=useAuth();
  // console.log(user);
  useEffect(() => {
    fetchJobs();
  }, []);
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/jobs-internships/get-job-posts?older=true"
      );
      const allJobs = response.data.data;

      // Separate jobs and internships
      const jobList = allJobs.filter((job) => job.jobType === "Full-time");
      const internshipList = allJobs.filter((job) => job.jobType === "Internship");

      setJobs(jobList);
      setInternships(internshipList);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleEditJob = (job) => {
    // console.log(job);
    setEditSelectedJob(job);
    setIsEditing(true); // Switch to editing mode
  };
 

const handleSaveJob = (updatedJob) => {
  const jobId = EditSelectedJob._id; // The job ID to identify the job
  // console.log(EditSelectedJob);
  const url = `http://localhost:8000/api/jobs-internships/id/${jobId}`;

  // Make an API call to update the job details
  axios
    .put(url, updatedJob, { withCredentials: true }) // Send updated job details and include credentials
    .then((response) => {
      // console.log('Job updated successfully:', response.data);

      // Update the local state with the response data (updated job details)
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === EditSelectedJob._id ? { ...job, ...response.data.data } : job
        )
      );
      alert("Job Updated Successfully");
      // Exit editing mode and clear selected job for editing
      setIsEditing(false);
      setEditSelectedJob(null);
    })
    .catch((error) => {
      console.error('Error updating job:', error);
      
      // Handle error (show message, etc.)
    });
};


  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditSelectedJob(null); // Close the edit form without saving
  };
  const handleAddNewJob = () => {
    setIsAdding(true);
  };
  // console.log(isEditing)
  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 3,mt:{md:10,xs:7} }}>
      <Container>
     { user?.userType==="admin" && (<Box sx={{ display: "flex", flexDirection:{xs:"column",md:"row"},alignItems: "center", mb: 3 ,justifyContent:"center",columnGap:3}}>
          <Typography variant="h5" align="center" gutterBottom fontWeight={600}>
            Job & Internship Listings
          </Typography>
          <Button variant="contained" color="primary" onClick={handleAddNewJob}>
            Add New Job
          </Button>
        </Box>
      )}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Jobs Section */}
            <Box sx={{ my: 3, p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h4" align="center" fontWeight={500} mb={3}>
                Full-Time Jobs
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {jobs.length > 0 ? (
                  jobs.map((job) => <JobCard key={job._id} job={job} onViewDetails={setSelectedJob} onEdit={handleEditJob} />)
                ) : (
                  <Typography color="textSecondary" align="center">
                    No full-time jobs available.
                  </Typography>
                )}
              </Grid>
            </Box>

            {/* Internships Section */}
            <Box sx={{ my: 5, p: 3, bgcolor: "white", borderRadius: 3, boxShadow: 2 }}>
              <Typography variant="h4" align="center" fontWeight={500} mb={3}>
                Internships
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {internships.length > 0 ? (
                  internships.map((job) => <JobCard key={job._id} job={job}  onViewDetails={setSelectedJob} onEdit={handleEditJob}/>)
                ) : (
                  <Typography color="textSecondary" align="center">
                    No internships available.
                  </Typography>
                )}
              </Grid>
            </Box>
          </>
        )}
      </Container>
    {/* Render editable job details */}

    {/* Render either JobDetails or EditableJobDetails */}
    {isEditing && EditSelectedJob &&  (
      
      <EditableJobDetails job={EditSelectedJob} onSave={handleSaveJob} onCancel={handleCancelEdit} refresh={fetchJobs}/>
    )}
    {!isEditing && selectedJob &&  (
      <JobDetails job={selectedJob} onClose={() => setSelectedJob(null)} />
    )}
    {isAdding && <AddJobForm onCancel={() => setIsAdding(false)} refresh={fetchJobs}/>}
     
    </Box>
  );
};

export default JobAndInternships;

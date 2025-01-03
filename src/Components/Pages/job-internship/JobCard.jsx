// give a job object and it will give you job card
import React from 'react';
import {Card,CardContent,CardActions,Typography,Button} from '@mui/material';
import './jobCard.css'


const JobCard = ({ job,jobType }) => {

    // Format the deadline to extract only the date
    const formattedDeadline = job?.deadline
    ? new Date(job.deadline).toISOString().split("T")[0]
    : "N/A";

  // console.log(jobType);
    return (
      <Card variant="outlined" sx={{ margin: 2, maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            <span className="heading">Title :</span > {job?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{fontWeight: 'bold'}} className="heading">Company :</span > {job?.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{fontWeight: 'bold'}} className="heading">Description :</span >{job?.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          <span style={{fontWeight: 'bold'}}  className="heading">Location:</span > {job?.location}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          {jobType === "onCampusJobs" ? (
            <>
              <span style={{ fontWeight: "bold" }}>Salary Range:</span> {job?.salaryRange || "N/A"}
            </>
          ) : (
            <>
              <span style={{ fontWeight: "bold" }}>Stipend:</span> {job?.stipend || "N/A"}
            </>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          <span style={{ fontWeight: "bold" }} className="heading">
            Deadline:
          </span>{" "}
          {formattedDeadline}
        </Typography>
        </CardContent>
        <CardActions style={{
          alignItems:"center",
          justifyContent:"center"
        }}>
          <Button size="small" variant="contained" color="primary">
            Apply
          </Button>
        </CardActions>
      </Card>
    );
  };

export default JobCard
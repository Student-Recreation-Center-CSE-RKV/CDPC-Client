import React from 'react';
import {Card,CardContent,CardActions,Typography,Button,Grid,} from '@mui/material';
import JobCard from './JobCard';
import jobs from './JobsList';

const JobList = (props) => {
  const {bgColor} = props;
  return <div  style={{padding:"20px", color:"black",marginTop:props.mt || "50px", backgroundColor:bgColor}}>
    <h1 style={{
      textAlign:"center"
    }} >{props.heading || "Job Postings"}</h1>
    <Grid style={{display:"flex" , flexDirection:"row" , marginTop : "50px"
      }} className='job-list' container spacing={2} justifyContent="center">
      {jobs.map((job, index) => (
        <Grid item key={index} xs={6} sm={4} md={3}>
          <JobCard job={job} />
        </Grid>
      ))}
    </Grid>
  </div>
};

export default JobList;

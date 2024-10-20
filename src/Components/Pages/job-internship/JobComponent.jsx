import React from 'react';
import {Grid} from '@mui/material';
import JobCard from './JobCard';
import jobs from './JobsList';

const JobList = (props) => {
  const {bgColor , jobType} = props;
  return <div  style={{padding:"20px", color:"black",marginTop:props.mt || "50px", backgroundColor:bgColor}}>
    <h1 style={{
      textAlign:"center"
    }} >{props.heading || "Job Postings"}</h1>
    <Grid style={{display:"flex" , flexDirection:"row" , marginTop : "50px"
      }} className='job-list' container spacing={2} justifyContent="center">
      {jobs[jobType].map((job, index) => (
          <JobCard key={job.id} job={job} />
      ))}
    </Grid>
  </div>
};

export default JobList;

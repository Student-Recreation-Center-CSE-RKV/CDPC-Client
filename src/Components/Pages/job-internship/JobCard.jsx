// give a job object and it will give you job card
import React from 'react';
import {Card,CardContent,CardActions,Typography,Button} from '@mui/material';
import './jobCard.css'


const JobCard = ({ job }) => {
    return (
      <Card variant="outlined" sx={{ margin: 2, maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            <span className="heading">Title :</span > {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{fontWeight: 'bold'}} className="heading">Company :</span > {job.company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{fontWeight: 'bold'}} className="heading">Description :</span >{job.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          <span style={{fontWeight: 'bold'}}  className="heading">Location:</span > {job.location}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
          <span style={{fontWeight: 'bold'}} className="heading">Salary Range:</span > {job.salaryRange}
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
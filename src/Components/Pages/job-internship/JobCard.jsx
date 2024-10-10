import React from 'react';
import {Card,CardContent,CardActions,Typography,Button,Grid,} from '@mui/material';

const JobCard = ({ job }) => {
    return (
      <Card variant="outlined" sx={{ margin: 2, maxWidth: 345 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {job.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {job.description}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Location: {job.location}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Salary Range: {job.salaryRange}
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
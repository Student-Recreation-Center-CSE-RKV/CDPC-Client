import { Card, CardContent, CardMedia, Typography, Button, Grid, CardActions, Box,IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../AuthContext";
import JobApplicationForm from "./JobApplicationForm";
import { useState } from "react";
const JobCard = ({ job, onViewDetails,onEdit }) => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false); // State to toggle form display
  // console.log(user.userType);
  return (
    <>
     {/* Render JobApplicationForm above all components when showForm is true */}
     {showForm && (
        <Box
          sx={{
            // position: "fixed",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay effect
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            // width: "80%",
            // maxWidth: "600px",
            // backgroundColor: "white",
            // boxShadow: 5,
            // padding: 3,
            // borderRadius: 2,
            // zIndex: 1000, // Higher z-index to keep it above other elements
            position: "fixed",
        // top: 0,
        // left: 0,
        width: "90%",
        height: "90%",
        
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        zIndex: 1000,
        overflowY: "auto",
          }}
        >
          <JobApplicationForm job={job} onClose={() => setShowForm(false)} />
        </Box>
      )}
  <Grid item xs={12} sm={6} md={4} lg={3} sx={{margin:2}}>
    <Card
      sx={{
        
        width: 280,
        boxShadow: 2,
        borderRadius: 2,
        position: "relative",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.02)", boxShadow: 4 },
      }}
    >
      {user?.userType==="admin" && (<IconButton
        onClick={() => onEdit(job)} // Trigger edit functionality when clicked
        sx={{
          position: 'absolute',
          top: 10,
          left: 10,
          fontSize: 30,
          color: 'gray',
        }}
      >
        <EditIcon />
      </IconButton>)}
      {/* Active/Inactive Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: job.isActive ? "#28a745" : "#dc3545",
          color: "white",
          padding: "3px 8px",
          borderRadius: "6px",
          fontSize: "11px",
          fontWeight: "bold",
        }}
      >
        {job.isActive ? "Active" : "Inactive"}
      </Box>

      {/* Company Logo */}
      {job.company.logo && (
        <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 2 }}>
          <CardMedia
            component="img"
            image={job.company.logo}
            alt={job.company.name}
            sx={{ width: 80, height: 80, objectFit: "cover" }}
          />
        </Box>
      )}

      <CardContent sx={{ textAlign: "center", padding: "12px 16px" }}>
        <Typography variant="h6" sx={{ fontSize: "16px", fontWeight: 600 }} gutterBottom>
          {job.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Company:</strong> {job.company.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
        <strong>Batch:</strong> {job.batch.join(', ')}
      </Typography>

        <Typography variant="body2" color="textSecondary">
          <strong>Salary:</strong> {job.salaryRange}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <strong>Deadline:</strong> {new Date(job.deadline).toDateString()}
        </Typography>
      </CardContent>

      {/* Buttons */}
      <CardActions sx={{ display: "flex", justifyContent: "space-between", padding: "10px 16px" }}>
        <Button  variant="contained" color="primary" size="small" onClick={() => setShowForm(true)}>
          Apply
        </Button>
        <Button onClick={() => onViewDetails(job)} variant="outlined" color="secondary" size="small">
          Details
        </Button>
      </CardActions>
    </Card>
  </Grid>
      </>
  );
};

export default JobCard;

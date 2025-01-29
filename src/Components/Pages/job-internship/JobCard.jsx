import { Card, CardContent, CardMedia, Typography, Button, Grid, CardActions, Box,IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from "../../AuthContext";
const JobCard = ({ job, onViewDetails,onEdit }) => {
  const { user } = useAuth();
  // console.log(user.userType);
  return (
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
        <Button href={job.company.website} target="_blank" variant="contained" color="primary" size="small">
          Visit Company
        </Button>
        <Button onClick={() => onViewDetails(job)} variant="outlined" color="secondary" size="small">
          Details
        </Button>
      </CardActions>
    </Card>
  </Grid>

  );
};

export default JobCard;

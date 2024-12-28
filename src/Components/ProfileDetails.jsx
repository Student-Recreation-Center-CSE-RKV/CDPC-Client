import React from "react";
import { Box, Typography, Avatar, Divider, Grid } from "@mui/material";
// import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
const ProfileDetails = () => {
    const {user}=useAuth();

    // const location =useLocation();

    // const { user } = location.state || {};

    // console.log("user:",user);
  if (!user || !user.userType) {
    return <Typography variant="h6" sx={{marginTop:20,textAlign:"center"}}>User data is not available</Typography>;
  }

  const commonDetails = (
    <>
      <Avatar
        alt="User Avatar"
        src={user.avatar || "/static/images/avatar/1.jpg"}
        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      />
      <Typography variant="h5">{user.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {user.email}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Role: {user.userType}
      </Typography>
    </>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", textAlign: "center",marginTop:10 }}>
      {commonDetails}
      <Divider sx={{ my: 2 }} />

      {user.userType === "student" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"><strong> Student Details </strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>College ID: {user.collegeId || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Year: {user.year || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Branch: {user.branch || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Phone: {user.phone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Skills: {user.skills?.join(", ") || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Description: {user.description || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>GitHub: {user.github || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>LinkedIn: {user.linkedIn || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Portfolio: {user.portfolio || "N/A"}</Typography>
          </Grid>
        </Grid>
      )}

      {user.userType === "admin" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"><strong>Admin Details</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Designation: {user.designation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Phone: {user.phone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Username: {user.username || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Employee ID: {user.employeeId || "N/A"}</Typography>
          </Grid>
          {/* <Grid item xs={6}>
            <Typography>Access Code: {user.adminAccessCode || "N/A"}</Typography>
          </Grid> */}
        </Grid>
      )}

      {user.userType === "alumni" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"><strong>Alumni Details</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Batch: {user.batch || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Branch: {user.branch || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Phone: {user.phone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Company: {user.companyName || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Designation: {user.designation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Location: {user.workingLocation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Experience: {user.experience || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>GitHub: {user.github || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>LinkedIn: {user.linkedin || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Portfolio: {user.portfolio || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Facebook: {user.facebook || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Career Goals: {user.careerGoals || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Achievements: {user.achievements || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Skills: {user.skills?.join(", ") || "N/A"}</Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProfileDetails;

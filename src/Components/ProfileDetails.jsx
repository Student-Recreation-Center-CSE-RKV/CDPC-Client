import {React,useState,useEffect} from "react";
import { Box, Typography, Avatar, Divider, Grid } from "@mui/material";
// import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
const ProfileDetails = () => {
    const {user}=useAuth();

    const [profileData, setProfileData] = useState(null);
    // const location =useLocation();

    // const { user } = location.state || {};

    console.log("user:",user);
    useEffect(() => {
      const fetchProfileData = async () => {
        if (!user || !user.userType) {
          console.error("User or userType not found.");
          return;
        }
  
        let url;
        if (user.userType === "alumni") {
          url = "http://localhost:8000/api/alumni/current-alumni";
        } else if (user.userType === "student") {
          url = "http://localhost:8000/api/student/current-student";
        } else {
          url = "http://localhost:8000/api/admin/current-admin";
        }
  
        try {
          const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const User = await response.json();
          // console.log("data",User.data);
          setProfileData(User.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
  
      fetchProfileData();
    }, [user]);
    console.log("ProfileData",user);
    if (!user || !user?.userType) {
      return <Typography variant="h6" sx={{marginTop:20,textAlign:"center"}}>User data is not available</Typography>;
    }
    if (!profileData) {
      return (
        <Typography variant="h6" sx={{ marginTop: 20, textAlign: "center" }}>
          Loading...
        </Typography>
      );
    }
  // if (!user || !user.userType) {
  //   return <Typography variant="h6" sx={{marginTop:20,textAlign:"center"}}>User data is not available</Typography>;
  // }

  const commonDetails = (
    <>
      <Avatar
        alt="User Avatar"
        src={profileData.avatar || "/static/images/avatar/1.jpg"}
        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
      />
      <Typography variant="h5">{profileData.name}</Typography>
      <Typography variant="subtitle1" color="text.secondary">
        {profileData.email}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Role: {profileData?.userType}
      </Typography>
    </>
  );

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", textAlign: "center",marginTop:10 }}>
      {commonDetails}
      <Divider sx={{ my: 2 }} />

      {profileData?.userType === "student" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"><strong> Student Details </strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>College ID: {profileData.collegeId || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Year: {profileData.year || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Branch: {profileData.branch || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Phone: {profileData.phone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Skills: {profileData.skills?.join(", ") || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Description: {profileData.description || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>GitHub: {profileData.github || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>LinkedIn: {profileData.linkedIn || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Portfolio: {profileData?.portfolio || "N/A"}</Typography>
          </Grid>
        </Grid>
      )}

      {profileData?.userType === "admin" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"><strong>Admin Details</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Designation: {profileData.designation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Phone: {profileData.phone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Username: {profileData.username || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Employee ID: {profileData.employeeId || "N/A"}</Typography>
          </Grid>
          {/* <Grid item xs={6}>
            <Typography>Access Code: {user.adminAccessCode || "N/A"}</Typography>
          </Grid> */}
        </Grid>
      )}

      {profileData?.userType === "alumni" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6"><strong>Alumni Details</strong></Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Batch: {profileData.batch || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Branch: {profileData.branch || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Phone: {profileData.phone || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Company: {profileData.companyName || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Designation: {profileData.designation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Location: {profileData.workingLocation || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Experience: {profileData.experience || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>GitHub: {profileData.github || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>LinkedIn: {profileData.linkedin || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Portfolio: {profileData.portfolio || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Facebook: {profileData.facebook || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Career Goals: {profileData.careerGoals || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Achievements: {profileData.achievements || "N/A"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Skills: {profileData.skills?.join(", ") || "N/A"}</Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProfileDetails;

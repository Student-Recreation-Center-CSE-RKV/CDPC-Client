import React from "react";
import {useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grow,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import InfoIcon from "@mui/icons-material/Info";

const PlacementPreparation = () => {
  const navigate = useNavigate(); 
  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Placement Preparation
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "50px 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Get Ready for Your Dream Job!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Practice technical skills, solve mock interviews, and ace your placements!
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }}>
          Start Preparing
        </Button>
      </Box>

      {/* Resources Section with 2 Cards per Row */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Essential Resources
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {/* Animating cards with Grow */}
          {[
            { title: "Coding Practice", description: "Hone your coding skills with platforms like LeetCode, HackerRank, and more.", icon: <SchoolIcon fontSize="large" color="primary" /> ,route:"/codingpracticepage", },
            { title: "Interview Preparation", description: "Get ready with mock interviews, common questions, and interview strategies.", icon: <SchoolIcon fontSize="large" color="primary" /> },
            { title: "Resume Building", description: "Learn how to craft a strong resume that stands out to recruiters.", icon: <SchoolIcon fontSize="large" color="primary" />  , route:"/resumebuildingpage",},
            { title: "Aptitude", description: "Sharpen your aptitude skills with various test papers and puzzles.", icon: <SchoolIcon fontSize="large" color="primary" /> , route:"/aptitude",},
          ].map((resource, index) => (
            <Grow in={true} timeout={(index + 1) * 500} key={index}>
              <Grid item xs={12} sm={6} md={6}>
                <Card 
                  onClick={() => resource.route && navigate(resource.route)}
                  sx={{cursor : "pointer"}}
                 >
                  <CardContent>
                    {resource.icon}
                    <Typography variant="h6" gutterBottom>
                      {resource.title}
                    </Typography>
                    <Typography>{resource.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Container>

      {/* Tips List Section */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Top Tips for Placement Success
        </Typography>
        <List>
          {[
            "Understand the job description thoroughly before applying.",
            "Brush up on fundamental data structures and algorithms.",
            "Practice coding problems regularly.",
            "Participate in mock interviews.",
            "Prepare for aptitude tests.",
          ].map((tip, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon color="success" />
              </ListItemIcon>
              <ListItemText primary={tip} />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default PlacementPreparation;
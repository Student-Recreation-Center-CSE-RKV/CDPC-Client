import React, { useState } from "react";
import { AppBar, Toolbar, Button, Typography, Container, Box, Paper } from "@mui/material";
import Companies from "./Companies";
import PlacementAnalytics from "./PlacementAnalytics";

const AdminDashboard = () => {
  // State to track the active button (default: 'Overview')
  const [activeTab, setActiveTab] = useState("Overview");

  // Function to render the component content dynamically
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <div style={{marginTop:"-100px"}}>
                <PlacementAnalytics />;
            </div>
      case "Companies":
        return <Companies />;
      case "Placement Data":
        return <Typography variant="h5">Analyze Placement Data Here!</Typography>;
      case "Reports":
        return <Typography variant="h5">Generate and View Reports Here!</Typography>;
      default:
        return <Typography variant="h5">Select a Section</Typography>;
    }
  };

  return (
    <Box sx={{ fontFamily: "Arial, sans-serif", marginTop: "80px", width: "100%" }}>
      {/* Top Navigation Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#ffffff", // Neutral toolbar background
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          padding: 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {["Overview", "Companies", "Placement Data", "Reports"].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                variant={activeTab === tab ? "contained" : "text"}
                sx={{
                  color: activeTab === tab ? "#ffffff" : "#000000",
                  backgroundColor: activeTab === tab ? "#1976D2" : "transparent",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: activeTab === tab ? "#1565C0" : "rgba(0, 0, 0, 0.05)",
                  },
                }}
              >
                {tab}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dynamic Content Section */}
      <Container
        component={Paper}
        elevation={2}
        sx={{
          padding: 4,
        //   marginTrim:1,
        //   margin: 2,
        margin: "5px auto", // Center the container with 5px margin
        maxWidth: "calc(100% - 10px)", // Ensure the container stays within the viewport
          backgroundColor: "#FAFAFA",
          borderRadius: "12px",
          minHeight: "70vh",
          textAlign: "center",
        }}
      >
        {renderContent()}
      </Container>
    </Box>
  );
};

export default AdminDashboard;

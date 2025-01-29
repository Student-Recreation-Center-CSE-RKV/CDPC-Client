import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemText, Typography, ListItemIcon, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import TimelineIcon from "@mui/icons-material/Timeline";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ setSelected }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box
      sx={{
        marginTop:"80px",
        width: isExpanded ? "20%" : "5%",
        height: "100vh",
        bgcolor: "background.paper",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s ease",
        position: "relative", // Ensure the toggle button can be positioned relative to the sidebar
      }}
    >
      {/* Toggle Button */}
      <IconButton
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          position: "absolute",
          top: "10px",
          right: isExpanded ? "-15px" : "-10px", // Adjust based on expanded or collapsed state
          backgroundColor: "primary.main",
          color: "white",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
          zIndex: 1, // Ensure it stays above the sidebar
        }}
      >
        {isExpanded ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

      <Box>
        <List>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              mb: 1,
              "&:hover": { bgcolor: "primary.light", color: "white" },
              justifyContent: isExpanded ? "flex-start" : "center",
            }}
            onClick={() => setSelected("profile")}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="My Profile" />}
          </ListItemButton>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              mb: 1,
              "&:hover": { bgcolor: "primary.light", color: "white" },
              justifyContent: isExpanded ? "flex-start" : "center",
            }}
            onClick={() => setSelected("edit-profile")}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Edit Profile" />}
          </ListItemButton>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              mb: 1,
              "&:hover": { bgcolor: "primary.light", color: "white" },
              justifyContent: isExpanded ? "flex-start" : "center",
            }}
            onClick={() => setSelected("dashboard")}
          >
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            {isExpanded && <ListItemText primary="Dashboard" />}
          </ListItemButton>
        </List>
      </Box>
      {isExpanded && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 2 }}
        >
          © 2025 CDPC
        </Typography>
      )}
    </Box>
  );
};

export default Sidebar;

import React from "react";
import { Box, List, ListItemButton, ListItemText, Typography, ListItemIcon } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import TimelineIcon from "@mui/icons-material/Timeline";

const Sidebar = ({ setSelected }) => {
  return (
    <Box
      sx={{
        width: "20%",
        height: "100vh",
        bgcolor: "background.paper",
        boxShadow: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          User Menu
        </Typography>
        <List>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              mb: 1,
              "&:hover": { bgcolor: "primary.light", color: "white" },
            }}
            onClick={() => setSelected("profile")}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              mb: 1,
              "&:hover": { bgcolor: "primary.light", color: "white" },
            }}
            onClick={() => setSelected("edit-profile")}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton
            sx={{
              borderRadius: "8px",
              mb: 1,
              "&:hover": { bgcolor: "primary.light", color: "white" },
            }}
            onClick={() => setSelected("activity")}
          >
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Activity" />
          </ListItemButton>
        </List>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mt: 2 }}
      >
        © 2025 Your App Name
      </Typography>
    </Box>
  );
};

export default Sidebar;

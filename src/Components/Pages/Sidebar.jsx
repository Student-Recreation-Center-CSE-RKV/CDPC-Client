import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

const Sidebar = ({ setSelected }) => {
  return (
    <Box sx={{ width: "20%", height: "100vh", bgcolor: "#f4f4f4", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Menu
      </Typography>
      <List>
        <ListItem button onClick={() => setSelected("profile")}>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button onClick={() => setSelected("activity")}>
          <ListItemText primary="Activity" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
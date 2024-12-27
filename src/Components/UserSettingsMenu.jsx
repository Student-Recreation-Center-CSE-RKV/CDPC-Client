import React, { useState } from "react";
import { Box, Tooltip, IconButton, Menu, MenuItem, Typography, Avatar, Divider } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const UserSettingsMenu = ({ settings, user,logout }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
// console.log(logout);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      const logoutUrl =
        user.userType === "alumni"
          ? "http://localhost:8000/api/alumni/logout"
          : "http://localhost:8000/api/student/logout";

      const response = await fetch(logoutUrl, {
        method: "POST",
        credentials: "include", // Ensure cookies are sent
      });
    //   console.log(response);
      if (response.ok) {
        // Clear session storage or cookies if necessary
        
        alert("Logout successful");
        logout();
        console.log("Logout successful");
        // Redirect to the login page
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
          <Avatar alt="User Avatar" src={user.avatar || "/static/images/avatar/1.jpg"} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        onClick={handleCloseUserMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            borderRadius: 2,
            minWidth: 200,
          },
        }}
      >
        {/* User Profile Section */}
        <Box sx={{ px: 2, py: 1, textAlign: "center" }}>
          <Avatar
            alt="User Avatar"
            src={user.avatar || "/static/images/avatar/1.jpg"}
            sx={{ width: 56, height: 56, mx: "auto" }}
          />
          <Typography variant="subtitle1" sx={{ mt: 1 }}>
            {user.name || "John Doe"} {/* Display user's name */}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email || "johndoe@example.com"} {/* Display user's email */}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />

        {/* Menu Items */}
        {settings.map((setting) =>
          setting.name === "Logout" ? (
            <MenuItem key={setting.name} onClick={handleLogout}>
              {setting.icon}
              <Typography sx={{ ml: 1 }}>{setting.name}</Typography>
            </MenuItem>
          ) : (
            <MenuItem key={setting.name}>
              <NavLink
                to={setting.path}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: isActive ? "#ffcc00" : "inherit",
                  width: "100%",
                })}
              >
                {setting.icon}
                <Typography sx={{ ml: 1 }}>{setting.name}</Typography>
              </NavLink>
            </MenuItem>
          )
        )}
      </Menu>
    </Box>
  );
};

export default UserSettingsMenu;

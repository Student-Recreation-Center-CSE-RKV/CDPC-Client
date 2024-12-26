import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import UserSettingsMenu from './UserSettingsMenu';
// import LogoutIcon from "@mui/icons-material"

import { useAuth } from './AuthContext';
const pages = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  { name: 'Job & Internships', path: '/job-internships' },
  { name: 'Placement-Prep', path: '/placement-preparation' },
  { name: 'Placement-Analytics', path: '/placement-analytics' },
  { name: 'Events', path: '/events-workshop' },
  { name: 'Alumni-Network', path: '/alumni-networks' },
];

// const settings = [
//   { name: 'Profile', path: '/login', icon: <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ height: 25, width: 25 }} /> },
//   { name: 'Login', path: '/login', icon: <LoginIcon /> },
//   { name: 'Dashboard', path: '/dashboard', icon: <MenuIcon /> },
//   { name: 'Logout', path: '/logout', icon: <LoginIcon /> },
// ];



function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const {user,logout}=useAuth();

  // console.log(user);
  const User = {
    name: user.name,
    email: user.email,
    avatar: user.avatar, // Optional
  };
  console.log(User);

  const settings = [
    {
      name: "Profile",
      path: "/profile",
      icon: (<Avatar
      alt="User Avatar"
      src={User.avatar || "/static/images/avatar/1.jpg"} // Use User.avatar if available
      sx={{ height: 25, width: 25 }}
    />),
    },
    { name: "Login", path: "/login", icon: <LoginIcon /> },
    { name: "Dashboard", path: "/dashboard", icon: <MenuIcon /> },
    { name: "Logout", path: "/logout", icon: <LoginIcon /> },
  ];   
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgb(9, 44, 95)', zIndex: 1000 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* App Logo */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            CDPC
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.path}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: isActive ? '#ffcc00' : 'inherit',
                    })}
                  >
                    {page.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink to={page.path} key={page.name} style={{ textDecoration: 'none' }}>
                <Button sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>

          {/* User Settings */}
          <UserSettingsMenu settings={settings} user={User}/>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
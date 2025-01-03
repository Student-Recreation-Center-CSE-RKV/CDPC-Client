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
// import LoginIcon from '@mui/icons-material/Login';
import UserSettingsMenu from './UserSettingsMenu';
// import LogoutIcon from "@mui/icons-material"
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from './AuthContext';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';


const pages = [
  { name: 'Home', path: '/', icon: <HomeIcon /> },
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

  /*const User = {
    name: user.name,
    email: user.email,
    avatar: user.avatar, // Optional
  };*/
  const User = {
  name: user?.name || "User",
  email: user?.email || "user@example.com",
  avatar: user?.avatar || "/static/images/avatar/1.jpg",
  userType:user?.userType||"User",
};

  // console.log(User);

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
    { name: "Edit", path: "/edit-details", icon: <EditIcon /> },
    { name: "Logout", path: "/logout", icon: <LogoutIcon /> },
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
 {/* CDPC Logo for Desktop and Mobile */}
        <Typography 
          variant="h4"
          noWrap
          component="a"
          href="#"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700, 
            letterSpacing: '.2rem',
            color: 'inherit',
            textDecoration: 'none',
            display: { xs: 'none', md: 'flex' }, // Show only on desktop
            mr: 2,
          }}
        >
          CDPC
        </Typography>

        

        
                  {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        

          <IconButton
            size="large"
            aria-label="open navigation menu"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ ml: 'auto' }}
          >
            <MenuIcon />
          </IconButton>
            {/* Center "CDPC" for mobile */}
            <Box sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white' }}>
            CDPC
          </Box>
          <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <NavLink
                  to={page.path}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? '#ffcc00' : 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                  })}
                >
                  {page.icon && <span style={{ marginRight: '8px' }}>{page.icon}</span>}
                  {page.name}
                </NavLink>
              </MenuItem>
            ))}
            {/* Login and Signup */}
            {!user && [
              <MenuItem key="login">
                <NavLink to="/login" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <LoginIcon sx={{ marginRight: '8px' }} />
                  Login
                </NavLink>
              </MenuItem>,
              <MenuItem key="signup">
                <NavLink to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <PersonAddIcon sx={{ marginRight: '8px' }} />
                  Signup
                </NavLink>
              </MenuItem>,
            ]}
          </Menu>
        </Box>


          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' ,marginLeft:user?80:0} }}>
          {pages.map((page) => (
          <NavLink to={page.path} key={page.name} style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              {page.icon && <span style={{ marginRight: '8px' }}>{page.icon}</span>}
              {page.name}
            </Button>
          </NavLink>
        ))}

          </Box>

            {/* User Settings or Login/Signup buttons */}
            {user ? (
            <UserSettingsMenu settings={settings} user={User} logout={logout} />
          ) : (
          // Box containing Login and Signup buttons
          <Box   sx={{ 
            display: { xs: 'none', md: 'flex' }, // Hide on mobile screens, show on desktop
            gap: 0.5 
          }}>
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1, // Adds space between icon and text
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <LoginIcon />
                Login
              </Button>
            </NavLink>
            <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1, // Adds space between icon and text
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
                }}
              >
                <PersonAddIcon />
                Signup
              </Button>
            </NavLink>
          </Box>
          )}
          
        </Toolbar>
      </Container>
    </AppBar>
    //   <AppBar position="fixed" sx={{ backgroundColor: 'rgb(9, 44, 95)', zIndex: 1000 }}>
    // <Container maxWidth="lg">
    //   <Toolbar disableGutters>
       

    //     {/* Navigation Links for Desktop */}
    //     <Box
    //       sx={{
    //         flexGrow: 1,
    //         display: { xs: 'none', md: 'flex' },
    //         justifyContent: 'center', // Center navigation links
    //         gap: 2,
    //       }}
    //     >
    //       {pages.map((page) => (
    //         <NavLink to={page.path} key={page.name} style={{ textDecoration: 'none' }}>
    //           <Button
    //             sx={{
    //               color: 'white',
    //               display: 'flex',
    //               alignItems: 'center',
    //               '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
    //             }}
    //           >
    //             {page.icon && <span style={{ marginRight: '8px' }}>{page.icon}</span>}
    //             {page.name}
    //           </Button>
    //         </NavLink>
    //       ))}
    //     </Box>

    //     {/* User Login/Signup or Settings */}
    //     {user ? (
    //       <UserSettingsMenu
    //         settings={settings}
    //         user={User}
    //         logout={logout}
    //         sx={{
    //           ml: 'auto',
    //         }}
    //       />
    //     ) : (
    //       <Box
    //         sx={{
    //           display: 'flex',
    //           gap: 0.5,
    //           ml: 'auto', // Align to the right
    //         }}
    //       >
    //         <NavLink to="/login" style={{ textDecoration: 'none' }}>
    //           <Button
    //             sx={{
    //               color: 'white',
    //               display: 'flex',
    //               alignItems: 'center',
    //               gap: 1,
    //               '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
    //             }}
    //           >
    //             <LoginIcon />
    //             Login
    //           </Button>
    //         </NavLink>
    //         <NavLink to="/dashboard" style={{ textDecoration: 'none' }}>
    //           <Button
    //             sx={{
    //               color: 'white',
    //               display: 'flex',
    //               alignItems: 'center',
    //               gap: 1,
    //               '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
    //             }}
    //           >
    //             <PersonAddIcon />
    //             Signup
    //           </Button>
    //         </NavLink>
    //       </Box>
    //     )}


    //   </Toolbar>
    // </Container>
    //   </AppBar>

  );
}

export default Navbar;
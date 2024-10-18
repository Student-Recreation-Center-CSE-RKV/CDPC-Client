import * as React from 'react';
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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Job & Internships', path: '/job-internships' },
  { name: 'Placement-Prep', path: '/placement-preparation' },
  { name: 'Placement-Analytics', path: '/placement-analytics' },
  { name: 'Events', path: '/events-workshop' },
  { name: 'Alumni-Network', path: '/alumni-networks' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgb(9, 44, 95)',zIndex:'1000'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
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
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{textAlign:'left'}} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              
            >
              {pages.map((page) => (
               <MenuItem key={page.name} onClick={handleCloseNavMenu} sx={{
                '&:hover': {
                  bgcolor: '#bbbbbb', // Change this to your desired hover color
                  color: 'white', // Change text color on hover if needed
                }
              }}>
               <NavLink 
                 to={page.path} 
                 style={({ isActive }) => ({
                   textDecoration: 'none', 
                   color: isActive ? '#ffcc00' : 'inherit' // Change color when active
                 })}
               >
                 <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
               </NavLink>
             </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* </Box> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RK VALLEY-CDPC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <NavLink to={page.path} key={page.name} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)', // Change to desired hover color
                    },}}
                >
                  {page.name}
                </Button>
              </NavLink>
            ))}
          </Box>
          <Box sx={{flexGrow: { xs: 1, md: 0 } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}
                 sx={{ p: 1, position:{xs: 'relative', md: 'static'},left:{xs:-13} }} 
                 aria-controls="menu-appbar" aria-haspopup="true">
                  <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ height: 25, width: 25 }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' , ml:{md:'30px',xs:'20px'}}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={handleCloseUserMenu}
                    sx={{
                      '&:hover': {
                        bgcolor: '#bbbbbb',
                        color: '#ffffff',
                      },
                    }}
                  >
                    <Typography sx={{ textAlign: 'center', p: 1 }}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

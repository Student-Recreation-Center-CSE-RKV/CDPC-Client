import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';  // Importing the social media icons

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'rgb(20, 50, 110)', padding: '20px 0', color: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1 - About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Career Development & Placement Cell
            </Typography>
            <Typography variant="body2" color="white">
              The Career Development and Placement Cell (CDPC) is dedicated to providing resources and opportunities for students' professional growth.
            </Typography>
          </Grid>

          {/* Column 2 - Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="/home" color="inherit" underline="hover">Home</Link></li>
              <li><Link href="/jobs" color="inherit" underline="hover">Job Listings</Link></li>
              <li><Link href="/events" color="inherit" underline="hover">Events & Workshops</Link></li>
              <li><Link href="/contact" color="inherit" underline="hover">Contact Us</Link></li>
            </ul>
          </Grid>

          {/* Column 3 - Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Resources
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link href="/mock-interviews" color="inherit" underline="hover">Mock Interviews</Link></li>
              <li><Link href="/practice-tests" color="inherit" underline="hover">Practice Tests</Link></li>
              <li><Link href="/placement-prep" color="inherit" underline="hover">Placement Preparation</Link></li>
              <li><Link href="/faqs" color="inherit" underline="hover">FAQs</Link></li>
            </ul>
          </Grid>

          {/* Column 4 - Contact and Social Icons */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              CDPC<br />
              RGUKT, RK Valley<br />
              Email: cdpc@example.com<br />
              Phone: +123 456 7890
            </Typography>
            {/* Social Media Icons */}
            <div style={{ marginTop: '10px' }}>
              <IconButton href="https://facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="https://twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
            </div>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '20px' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} CDPC, All Rights Reserved
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;

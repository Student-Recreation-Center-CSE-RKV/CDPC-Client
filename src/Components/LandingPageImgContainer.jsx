import React, { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';

const MotionContainer = motion(Container);

const LandingPageImgContainer = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Animate on page load
    controls.start({ x: -550, opacity: 1 });
  }, [controls]);

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Adjust the x position based on scroll direction
    if (scrollY > 0) {
      controls.start({ x: -1400, opacity: 1 }); // Scroll down
    } else {
      controls.start({ x: -550, opacity: 1 }); // Scroll up
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <Box
      sx={{
        // paddingTop: { xs: '-50px', sm: '-20px', md: '40px' }, // Adjust padding for different sizes
        height: {md:'100vh',xs:'35vh'},
        width:{xs:'100%'}, // Full screen height
        backgroundImage: 'url(./rkv_img1.jpg)', // Replace with your image URL
        backgroundSize: {
          xs: 'contain', // Ensure the image fits within the viewport for small screens
          sm: 'cover', // Cover the entire background on larger screens
        },
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        display: 'flex',
        position: 'relative',
      }}
    >
      {/* Overlay Container */}
      <MotionContainer
        initial={{ x: -900, opacity: 0 }}
        animate={controls}
        transition={{ duration: 0.9 }}
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-80%)',
          width: { xs: '80%', sm: '70%', md: '60%' }, // Responsive width
          padding: { xs: '5px', sm: '10px', md: '20px' }, // Responsive padding
          background: 'rgba(11, 53, 109, 0.3)',
          backdropFilter: 'blur(2px)',
          color: '#ffffff',
          fontWeight: 'bold',
          zIndex: 100,
          lineHeight: '1.5',
          borderRadius: '15px',
          fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }, // Responsive font size
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
          display: { xs: 'none', md: 'block' }, // Hide on small screens, show on medium and up
        }}
      >
        {/* Text Content */}
        <Typography variant="h5" component="h4" gutterBottom>
          Welcome to RGUKT RK Valley's
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          Career Development and Placement Cell
        </Typography>
        <Typography variant="body1" sx={{fontSize:'17px'}}>
        The Career Development and Placement Cell (CDPC) at RGUKT, R.K. Valley prepares students to become competent professionals by offering skill development and training. CDPC bridges the gap between academia and industry with an updated curriculum and expert faculty, focusing on communication, leadership, and problem-solving skills. The cell also conducts seminars on personality development and interpersonal skills to boost employability, aiming to equip students for successful campus placements.
        </Typography>
      </MotionContainer>
    </Box>
  );
};

export default LandingPageImgContainer;

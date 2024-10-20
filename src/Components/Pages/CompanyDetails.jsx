import React from 'react';
import { Typography, Card, Container, Button, Box, Grid } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CompanyDetails = ({ company, onBack }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Container sx={{ padding: '20px' }}>
      <Button onClick={onBack} variant="contained" sx={{ marginBottom: 2 }}>
        Back
      </Button>

      <Card sx={{ boxShadow: 4, padding: '20px', borderRadius: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {/* Company and Logo Section */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            {/* Company Details */}
            <Box sx={{ flexGrow: 1, marginRight: 2 }}>
              <Typography variant="h4">{company.name}</Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Number of Hires: {company.hires}
              </Typography>
              <Typography variant="body1" paragraph>
                Average Package: {company.averagePackage}
              </Typography>

              {/* Interview Rounds */}
              <Typography variant="h6" gutterBottom>Interview Rounds:</Typography>
              <ul>
                {company.rounds.map((round, index) => (
                  <li key={index}>
                    <Typography variant="body1">{`Round ${round.round}: ${round.description}`}</Typography>
                  </li>
                ))}
              </ul>
            </Box>

            {/* Logo Section */}
            <Box sx={{ width: '25%', maxWidth: '200px' }}>
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  backgroundColor: '#f0f0f0',
                  padding: '10px',
                }}
              />
            </Box>
          </Box>

          {/* Interview Experiences Carousel */}
          <Typography variant="h6" gutterBottom>Interview Experiences:</Typography>
          <Box 
  sx={{ 
    width: '97%', 
    marginBottom:'50px', 
    padding: '10px', 
    backgroundColor: '#f9f9f9', 
    borderRadius: '8px',
    // overflow: 'hidden' // Prevents cards from being cut off
  }}
>
  <Slider {...sliderSettings}>
    {company.interviewExperiences.map((experience, index) => (
      <Box
        key={index}
        sx={{
          padding: '10px', // Horizontal space between slides
          margin:0
        }}
      >
        <Card
          sx={{
            boxShadow: 4,
            padding: '20px',
            borderRadius: 2,
            backgroundColor: '#fff',
            height: 'auto',
            margin:' 0 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            paragraph
            sx={{ fontStyle: 'italic', color: '#333' }}
          >
            <strong>&ldquo;</strong> {experience.comment} <strong>&rdquo;</strong>
          </Typography>
          <Typography
            variant="body2"
            textAlign="end"
            sx={{ fontWeight: 'bold', color: '#0077b5' }}
          >- 
            <a
              href={experience.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: 'underline',
                color: '#0077b5',
              }}
            >
              {experience.person}
            </a>
          </Typography>
        </Card>
      </Box>
    ))}
  </Slider>
</Box>


          {/* Alumni LinkedIn Profiles */}
          <Typography variant="h6" gutterBottom>Alumni LinkedIn Profiles:</Typography>
          <Grid container spacing={2}>
            {company.alumniProfiles.map((profile, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: '#0077b5', color: 'white', padding: '10px', borderRadius: '20px',textAlign:'center' }}>
                  <Typography variant="body2">
                    <a href={profile.link} target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'underline' }}>
                    {profile.name}
                    </a>
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Card>
    </Container>
  );
};

export default CompanyDetails;

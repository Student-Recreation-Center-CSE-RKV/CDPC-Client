import React from 'react';
import { Typography, Card, CardContent, Grid, Box } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CompanyCarousel = ({ placementData, handleCompanyClick, selectedYear = '2023-2024' }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  // Guard in case selectedYear or placementData is not available
  if (!placementData || !placementData[selectedYear]) {
    return <Typography variant="body1">No data available for the selected year.</Typography>;
  }

  const companyInsights = placementData[selectedYear].companyInsights;

  return (
    <section>
      <br />
      <Typography variant="h5" gutterBottom>
        Company Insights - {selectedYear}
      </Typography>
      <Typography variant="body1" paragraph>
        Information about companies that visited the campus, number of hirings, and average salary packages offered.
        <Typography variant="body2" color="blue">Click on a company to view detailed information.</Typography>
      </Typography>

      {/* Conditionally render either the carousel or the cards */}
      <Box sx={{ width: '100%', margin: '40px 0' }}>
        {companyInsights.length > 2 ? (
          // Render the carousel if there are more than 2 companies
          <Slider {...sliderSettings}>
            {companyInsights.map((company, index) => (
              <Box key={index} sx={{ padding: '0 20px' }}> {/* Horizontal gap increased by adding more padding here */}
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #00bcd4 30%, #26c6da 90%)',
                    boxShadow: 4,
                    borderRadius: 3,
                    marginRight: '30px',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCompanyClick(company)} // Handle click for detailed view
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      {/* Logo Section */}
                      <Grid item xs={4}>
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          style={{
                            width: '100%',
                            maxHeight: '60px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            padding: '5px',
                          }}
                        />
                      </Grid>

                      {/* Company Information Section */}
                      <Grid item xs={8}>
                        <Typography variant="h6" color="white">
                          {company.name}
                        </Typography>
                        <Typography color="white">Number of Hires: {company.hires}</Typography>
                        <Typography color="white">Average Package: {company.averagePackage}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Slider>
        ) : (
          // Render company cards directly if 2 or fewer companies
          <Grid container spacing={2}>
            {companyInsights.map((company, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    background: 'linear-gradient(135deg, #00bcd4 30%, #26c6da 90%)',
                    boxShadow: 4,
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                    cursor: 'pointer',
                  }}
                  onClick={() => handleCompanyClick(company)}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      {/* Logo Section */}
                      <Grid item xs={4}>
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          style={{
                            width: '100%',
                            maxHeight: '60px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            padding: '5px',
                          }}
                        />
                      </Grid>

                      {/* Company Information Section */}
                      <Grid item xs={8}>
                        <Typography variant="h6" color="white">
                          {company.name}
                        </Typography>
                        <Typography color="white">Number of Hires: {company.hires}</Typography>
                        <Typography color="white">Average Package: {company.averagePackage}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </section>
  );
};

export default CompanyCarousel;

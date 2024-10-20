import React, { useState, useEffect } from 'react';
import { Typography,
   Container, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Box }from '@mui/material';
import CompanyDetails from './CompanyDetails'; // Import the new component
import CompanyCarousel from './CompanyCarousel';
// import LineChartComponent from '../LineChart';
import BarChartComponent from '../BarChartComponent';
const PlacementAnalytics = () => {
  const [placementData, setPlacementData] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2023-2024');
  const [selectedCompany, setSelectedCompany] = useState(null); // Track selected company
  const [selectedMetric, setSelectedMetric] = useState(null); // To track which metric to show

 useEffect(() => {
  const fetchData = async () => {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          '2023-2024': {
            year:'2023-2024',
            overallRate: '56%',
            averagePackage: '₹6 LPA',
            highestPackage: '₹7 LPA',
            totalStudentsPlaced: 57,
            companyInsights: [
              {
                name: 'Company B',
                hires: 30,
                averagePackage: '₹7 LPA',
                logo: '/path/to/companyB-logo.png',
                rounds: [
                  { round: 1, description: 'Aptitude Test (Written)' },
                  { round: 2, description: 'Technical Interview' },
                  { round: 3, description: 'HR Interview' },
                ],
                interviewExperiences: [
                  {
                    person: 'Alumni 7',
                    comment: 'The aptitude test was challenging but fair. The technical interview focused on algorithms.',
                    linkedin: 'https://linkedin.com/in/alumni7',
                  },
                ],
                alumniProfiles: [
                  { name: 'Alumni 3', link: 'https://linkedin.com/in/alumni3' },
                  { name: 'Alumni 4', link: 'https://linkedin.com/in/alumni4' },
                ],
              },
              {
                name: 'Company B',
                hires: 30,
                averagePackage: '₹8 LPA',
                logo: '/path/to/companyB-logo.png',
                rounds: [
                  { round: 1, description: 'Aptitude Test (Written)' },
                  { round: 2, description: 'Technical Interview' },
                  { round: 3, description: 'HR Interview' },
                ],
                interviewExperiences: [
                  {
                    person: 'Alumni 7',
                    comment: 'The aptitude test was challenging but fair. The technical interview focused on algorithms.',
                    linkedin: 'https://linkedin.com/in/alumni7',
                  },
                ],
                alumniProfiles: [
                  { name: 'Alumni 3', link: 'https://linkedin.com/in/alumni3' },
                  { name: 'Alumni 4', link: 'https://linkedin.com/in/alumni4' },
                ],
              },
            ],
          },
          '2022-2023': {
            year:'2022-2023',
            overallRate: '75%',
            averagePackage: '₹6 LPA',
            highestPackage: '₹8 LPA',
            totalStudentsPlaced: 300,
            companyInsights: [
              {
                name: 'Company A',
                hires: 30,
                averagePackage: '₹9 LPA',
                logo: '/path/to/companyA-logo.png',
                rounds: [
                  { round: 1, description: 'Aptitude Test (Written)' },
                  { round: 2, description: 'Technical Interview' },
                  { round: 3, description: 'HR Interview' },
                ],
                interviewExperiences: [
                  {
                    person: 'Alumni 5',
                    comment: 'The aptitude test was challenging but fair. The technical interview focused on data structures.',
                    linkedin: 'https://linkedin.com/in/alumni5',
                  },
                  {
                    person: 'Alumni 6',
                    comment: 'I found the HR interview to be quite straightforward, focusing more on soft skills and cultural fit.',
                    linkedin: 'https://linkedin.com/in/alumni6',
                  },
                ],
                alumniProfiles: [
                  { name: 'Alumni 1', link: 'https://linkedin.com/in/alumni1' },
                  { name: 'Alumni 2', link: 'https://linkedin.com/in/alumni2' },
                ],
              },
              {
                name: 'Company B',
                hires: 30,
                averagePackage: '₹9 LPA',
                logo: '/path/to/companyA-logo.png',
                rounds: [
                  { round: 1, description: 'Aptitude Test (Written)' },
                  { round: 2, description: 'Technical Interview' },
                  { round: 3, description: 'HR Interview' },
                ],
                interviewExperiences: [
                  {
                    person: 'Alumni 5',
                    comment: 'The aptitude test was challenging but fair. The technical interview focused on data structures.',
                    linkedin: 'https://linkedin.com/in/alumni5',
                  },
                  {
                    person: 'Alumni 6',
                    comment: 'I found the HR interview to be quite straightforward, focusing more on soft skills and cultural fit.',
                    linkedin: 'https://linkedin.com/in/alumni6',
                  },
                ],
                alumniProfiles: [
                  { name: 'Alumni 1', link: 'https://linkedin.com/in/alumni1' },
                  { name: 'Alumni 2', link: 'https://linkedin.com/in/alumni2' },
                  { name: 'Alumni 3', link: 'https://linkedin.com/in/alumni1' },
                  { name: 'Alumni 4', link: 'https://linkedin.com/in/alumni2' },
                ],
              },
              {
                name: 'Company C',
                hires: 30,
                averagePackage: '₹9 LPA',
                logo: '/path/to/companyA-logo.png',
                rounds: [
                  { round: 1, description: 'Aptitude Test (Written)' },
                  { round: 2, description: 'Technical Interview' },
                  { round: 3, description: 'HR Interview' },
                ],
                interviewExperiences: [
                  {
                    person: 'Alumni 5',
                    comment: 'The aptitude test was challenging but fair. The technical interview focused on data structures.',
                    linkedin: 'https://linkedin.com/in/alumni5',
                  },
                  {
                    person: 'Alumni 6',
                    comment: 'I found the HR interview to be quite straightforward, focusing more on soft skills and cultural fit.',
                    linkedin: 'https://linkedin.com/in/alumni6',
                  },
                ],
                alumniProfiles: [
                  { name: 'Alumni 1', link: 'https://linkedin.com/in/alumni1' },
                  { name: 'Alumni 2', link: 'https://linkedin.com/in/alumni2' },
                ],
              },
              // More companies can be added here
            ],
          },
          
          '2021-2022': {
            year:'2021-2022',
            overallRate: '85%',
            averagePackage: '₹6 LPA',
            highestPackage: '₹7.5 LPA',
            totalStudentsPlaced: 300,
            companyInsights: [
              // Company data for this year
            ],
          },
          '2020-2021': {
            year:'2020-2021',
            overallRate: '85%',
            averagePackage: '₹6.5 LPA',
            highestPackage: '₹11 LPA',
            totalStudentsPlaced: 270,
            companyInsights: [
              // Company data for this year
            ],
          },
          '2019-2020': {
            year:'2019-2020',
            overallRate: '60%',
            averagePackage: '₹5 LPA',
            highestPackage: '₹8.5 LPA',
            totalStudentsPlaced: 330,
            companyInsights: [
              // Company data for this year
            ],
          },
          '2018-2019': {
            year:'2018-2019',
            overallRate: '85%',
            averagePackage: '₹5.5 LPA',
            highestPackage: '₹8 LPA',
            totalStudentsPlaced: 58,
            companyInsights: [
              // Company data for this year
            ],
          },
        });
      }, 1000);
    });

    setPlacementData(response);
  };

  fetchData();
}, []);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleCompanyClick = (company) => {
    setSelectedCompany(company); // Set the selected company
    // console.log(company);
  };

  const handleBack = () => {
    setSelectedCompany(null); // Go back to the company list
  };
  const handleCardClick = (metric) => {
    // Toggle the selected metric, if already selected, deselect it
    setSelectedMetric((prevMetric) => (prevMetric === metric ? null : metric));
  };

  if (!placementData) {
    return (
      <Container sx={{ padding: '20px 0' }}>
        <Typography variant="h5">Loading Placement Analytics...</Typography>
      </Container>
    );
  }

  const currentYearData = placementData[selectedYear];
  const lineChartData = Object.values(placementData).map((yearData) => ({
    year: yearData.year,
    totalStudentsPlaced: yearData.totalStudentsPlaced,
    averagePackage: parseFloat(yearData.averagePackage.replace('₹', '').replace(' LPA', '')),
    highestPackage: parseFloat(yearData.highestPackage.replace('₹', '').replace(' LPA', '')),
    overallRate: parseFloat(yearData.overallRate.replace('%', '')), // Converts '85%' to 85 (as a float)
  }));
  
  console.log(lineChartData);
  return (
    <Container sx={{ padding: '20px 20px' }}>
      <br />
      <br />
      <br />
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Placement Analytics</Typography>

        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="year-select-label">Academic Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            label="Academic Year"
            onChange={handleYearChange}
          >
            <MenuItem value="2023-2024">2023-2024</MenuItem>
            <MenuItem value="2022-2023">2022-2023</MenuItem>
            <MenuItem value="2021-2022">2021-2022</MenuItem>
            <MenuItem value="2020-2021">2020-2021</MenuItem>
            <MenuItem value="2019-2020">2019-2020</MenuItem>
            <MenuItem value="2018-2019">2018-2019</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <section>
        <Typography variant="h5" gutterBottom>
          Monitor Placement Rates ({selectedYear})
        </Typography>
        {/* <LineChartComponent data={lineChartData}/> */}
        <Typography variant="body1" paragraph>
          Track the placement rates and average packages of students from various departments.
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <Card
              onClick={() => handleCardClick('overallRate')} // Set the metric to 'overallRate'
              sx={{
                background: 'linear-gradient(135deg, #4caf50 30%, #66bb6a 90%)',
                boxShadow: 4,
                borderRadius: 3,
                height:{xs:'150px',md:'120px'},
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
                cursor:'pointer'
                
              }}
            >
              <CardContent sx={{textAlign:"center"}}>
                <Typography variant="h6" color="white">
                  Overall Placement Rate
                </Typography>
                <Typography variant="h4" color="white" fontWeight="bold">
                  {currentYearData.overallRate}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Card
              onClick={() => handleCardClick('averagePackage')} // Set the metric to 'overallRate'
              sx={{
                background: 'linear-gradient(135deg, #3f51b5 30%, #5c6bc0 90%)',
                boxShadow: 4,
                borderRadius: 3,
                height:{xs:'150px',md:'120px'},
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
                cursor:'pointer'
              }}
            >
              <CardContent sx={{textAlign:"center"}}>
                <Typography variant="h6" color="white">
                  Average Package 
                </Typography>
                <Typography variant="h4" color="white" fontWeight="bold">
                  {currentYearData.averagePackage}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Card
            onClick={() => handleCardClick('highestPackage')} // Set the metric to 'averagePackage'
              sx={{
                background: 'linear-gradient(135deg, #ff9800 30%, #ffb74d 90%)',
                boxShadow: 4,
                borderRadius: 3,
                height:{xs:'150px',md:'120px'},
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
                cursor:'pointer'
              }}
            >
              <CardContent sx={{textAlign:"center"}}>
                <Typography variant="h6" color="white">
                  Highest Package
                </Typography>
                <Typography variant="h4" color="white" fontWeight="bold">
                  {currentYearData.highestPackage}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <Card
            onClick={() => handleCardClick('totalStudentsPlaced')} // Set the metric to 'totalStudentsPlaced'
              sx={{
                background: 'linear-gradient(135deg, #e91e63 30%, #f06292 90%)',
                boxShadow: 4,
                borderRadius: 3,
                transition: 'transform 0.3s ease',
                height:{xs:'150px',md:'120px'},
                '&:hover': { transform: 'scale(1.05)' },
                cursor:'pointer'
              }}
            >
              <CardContent sx={{textAlign:"center"}}>
                <Typography variant="h6" color="white">
                  Total Students Placed
                </Typography>
                <Typography variant="h4" color="white" fontWeight="bold">
                  {currentYearData.totalStudentsPlaced}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
         {/* Display the LineChart based on the selectedMetric */}
      {selectedMetric && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Showing Data for: {selectedMetric}</Typography>
          {/* <LineChartComponent data={lineChartData} metric={selectedMetric} /> */}
          <BarChartComponent data={lineChartData} metric={selectedMetric} />
        </div>
      )}
      </section>
      {/* If a company is selected, show the CompanyDetails component */}
      {selectedCompany ? (
        <CompanyDetails company={selectedCompany} onBack={handleBack} />
      ) : (
        <>
          {placementData && (
        <CompanyCarousel
          placementData={placementData} // Pass the complete placement data object
          selectedYear={selectedYear} // Pass the currently selected year to display data for that year
          handleCompanyClick={handleCompanyClick} // Pass the function for handling clicks on company cards
        />
      )}

        </>
      )}
    </Container>
  );
};

export default PlacementAnalytics;

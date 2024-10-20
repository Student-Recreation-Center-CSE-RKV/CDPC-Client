import React from 'react';
import LandingPageImgContainer from '../LandingPageImgContainer';
import {Box} from '@mui/material';
import ObjectivesSection from '../ObjectivesSection';
// import MyTimeline from '../TimeLine';
import HomeSection from '../HomeSection';
// import DirectorMessage from '../DirectorMessage';
// import Test from  '../Test'
import ContactUs from '../ContactUS';
const Home = () => {
  return (
    <div>
      <Box sx={{ paddingTop: '50px' }}> {/* Adjust based on your navbar height */}
        <LandingPageImgContainer />
        <ObjectivesSection/>
        {/* <MyTimeline/> */}
        <HomeSection/><br/>
        <ContactUs/>
        {/* Other components or content */}
      </Box>
    </div>
  );
};

export default Home;

// src/components/JobInterview.js

import React from 'react';
import JobList from './job-internship/JobComponent';

const JobAndInternships = () => {
  return <div className='job-apply'>
    <JobList bgColor="whitesmoke" mt="60px" />
    <JobList bgColor="whitesmoke" heading="OnCampus Internship" />
    <JobList bgColor="whitesmoke" heading="OffCampus Internship" />
  </div>
};

export default JobAndInternships;

// src/components/JobInterview.js

import React from 'react';
import JobList from './job-internship/JobComponent';

const JobAndInternships = () => {
  return <div className='job-apply'>
    <JobList jobType="onCampusJobs" bgColor="whitesmoke" mt="60px" />
    <JobList jobType="onCampusInternships" bgColor="whitesmoke" heading="OnCampus Internship" />
    <JobList jobType="offCampusJobs" bgColor="whitesmoke" heading="OffCampus Internship" />
  </div>
};

export default JobAndInternships;

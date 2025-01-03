// src/components/JobInterview.js

// import React from 'react';
// import JobList from './job-internship/JobComponent';
// import { useAuth } from '../AuthContext';
// const JobAndInternships = () => {
//   const {user}=useAuth();
//   console.log(user);
//   return <div className='job-apply'>
//     <JobList jobType="onCampusJobs" bgColor="whitesmoke" mt="60px" />
//     <JobList jobType="onCampusInternships" bgColor="whitesmoke" heading="OnCampus Internship" />
//     <JobList jobType="offCampusJobs" bgColor="whitesmoke" heading="OffCampus Internship" />
//   </div>
// };

// export default JobAndInternships;

import React from "react";
import JobList from "./job-internship/JobComponent";
import { useAuth } from "../AuthContext";
import InternshipList from "./job-internship/InternshipComponent";

const JobAndInternships = () => {
  const { user } = useAuth();

 

  return (
    <div className="job-apply">


      {/* Job lists */}
      <JobList 
        jobType="onCampusJobs"
        bgColor="whitesmoke" 
        heading="Job Postings"
        userType={user?.userType}
      />
      <InternshipList
        jobType="onCampusInternships"
        bgColor="whitesmoke"
        heading="OnCampus Internships"
        userType={user?.userType}
      />
      {/* <JobList
        jobType="offCampusJobs"
        bgColor="whitesmoke"
        heading="OffCampus Internship"
      /> */}
    </div>
  );
};

export default JobAndInternships;

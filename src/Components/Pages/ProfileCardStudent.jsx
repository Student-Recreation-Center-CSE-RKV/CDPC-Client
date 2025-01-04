import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
// import ProfileCard from "./ProfileCard";
import { Box } from "@mui/material";
import AlumniProfileCard from "./AluminiProfile";
import ProfileCard from "./StudentProfile";
import ProfileDetails from "../ProfileDetails";
const ProfileCardStudent = () => {
  const {user}=useAuth();
  // console.log(user);
  const [selected, setSelected] = useState("profile");

  return (
    <Box display="flex">
      <Sidebar setSelected={setSelected} />
      {selected === "edit-profile" && user.userType==="student" && <ProfileCard />}
      {selected === "edit-profile" && user.userType==="alumni" && <AlumniProfileCard />}
      {selected === "profile" && user.userType==="student" && <ProfileDetails />}
      {selected === "profile" && user.userType==="alumni" && <ProfileDetails />}
      {selected === "activity" && <Box p={4}>Activity Page</Box>}
    </Box>
  );
};

export default ProfileCardStudent;
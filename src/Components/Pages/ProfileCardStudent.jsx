import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../AuthContext";
// import ProfileCard from "./ProfileCard";
import { Box } from "@mui/material";
import AlumniProfileCard from "./AluminiProfile";
import ProfileCard from "./StudentProfile";
const ProfileCardStudent = () => {
  const {user}=useAuth();
  // console.log(user);
  const [selected, setSelected] = useState("profile");

  return (
    <Box display="flex">
      <Sidebar setSelected={setSelected} />
      {selected === "profile" && user.userType==="student" && <ProfileCard />}
      {selected === "profile" && user.userType==="alumni" && <AlumniProfileCard />}
      {selected === "activity" && <Box p={4}>Activity Page</Box>}
    </Box>
  );
};

export default ProfileCardStudent;
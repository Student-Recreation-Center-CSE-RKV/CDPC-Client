import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfileCard from "./ProfileCard";
import { Box } from "@mui/material";

const ProfileCardStudent = () => {
  const [selected, setSelected] = useState("profile");

  return (
    <Box display="flex">
      <Sidebar setSelected={setSelected} />
      {selected === "profile" && <ProfileCard />}
      {selected === "activity" && <Box p={4}>Activity Page</Box>}
    </Box>
  );
};

export default ProfileCardStudent;
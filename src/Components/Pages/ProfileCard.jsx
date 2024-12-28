import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfileCardStudent from "./ProfileCardStudent";
import ProfileCardAlumini from "./ProfileCardAlumini";
import { Box } from "@mui/material";

const ProfileCard = () => {
  const [selected, setSelected] = useState("profile");

  return (
    <Box display="flex">
      <Sidebar setSelected={setSelected} />
      {selected === "profile" && <ProfileCardStudent />}
      {selected === "profile" && <ProfileCardAlumini />}
      {selected === "activity" && <Box p={4}>Activity Page</Box>}
    </Box>
  );
};

export default ProfileCard;
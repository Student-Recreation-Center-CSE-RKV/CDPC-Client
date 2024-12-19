import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardActionArea, CardContent, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import BusinessIcon from "@mui/icons-material/Business";
import useMediaQuery from "@mui/material/useMediaQuery";

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  // User roles array
  const userRoles = [
    { label: "Student", type: "student", icon: <SchoolIcon fontSize="large" />, color: "blue" },
    { label: "Alumni", type: "alumni", icon: <BusinessIcon fontSize="large" />, color: "green" },
  ];

  // Handle user type selection
  const handleSelection = (userType) => {
    navigate(`/edit-profile/${userType}`);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h4" mb={4}>
        Select your role to proceed
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "2rem" : "1.5rem",
        }}
      >
        {userRoles.map((role, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <Card
              sx={{
                maxWidth: 300,
                textAlign: "center",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardActionArea onClick={() => handleSelection(role.type)} aria-label={role.label}>
                <CardContent>
                  <Avatar
                    sx={{
                      bgcolor: role.color,
                      width: 120,
                      height: 100,
                      margin: "0 auto",
                    }}
                  >
                    {role.icon}
                  </Avatar>
                  <Typography variant="h6" mt={2}>
                    {role.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;

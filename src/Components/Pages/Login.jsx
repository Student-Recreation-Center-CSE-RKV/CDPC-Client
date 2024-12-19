import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Add authentication logic here
    navigate("/student/profile"); // or "/alumni/profile" based on user type
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <Typography variant="h4" textAlign="center" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Box mb={2}>
            <TextField label="Email" variant="outlined" fullWidth />
          </Box>
          <Box mb={2}>
            <TextField label="Password" variant="outlined" fullWidth type="password" />
          </Box>
          <Button type="submit" variant="contained" fullWidth   onClick={() => navigate("/")}>
            Login
          </Button>
          <Button
            variant="text"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/dashboard")}
          >
            
            Create an Account
          </Button>
        </form>
      </motion.div>
    </Box>
  );
};

export default Login;
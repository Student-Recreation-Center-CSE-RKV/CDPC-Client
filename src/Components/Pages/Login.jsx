import React, { useState } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {login}=useAuth();
  const handleLogin = async (event) => {
    event.preventDefault();
  
    if (!email || !password || !role) {
      alert("Please fill in all fields.");
      return;
    }
  
    setIsLoading(true);
    let errorData;
  
    try {
      // Determine the API endpoint based on the selected role
      const endpoint =
        role === "student"
          ? "http://localhost:8000/api/student/login"
          : role === "alumni"
          ? "http://localhost:8000/api/alumni/login"
          : "http://localhost:8000/api/admin/login"; // Admin login endpoint
  
      // Make the POST request to the API
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
  
      if (response.ok) {
        const Data = await response.json();
        console.log("Login Successful:", Data);
        
        // Redirect based on the role
        if (role === "student") {
          alert("Student login successful");
          login(Data.data.student);
          navigate("/");
        } else if (role === "alumni") {
          alert("Alumni login successful");
          login(Data.data.alumni);
          navigate("/");
        } else if (role === "admin") {
          alert("Admin login successful");
          console.log(Data.data.admin);
          login(Data.data.admin); // Adjust the key based on the API response
          navigate("/"); // Redirect admin to their dashboard
        }
      } else {
        errorData = await response.json();
        alert(`Login failed: ${errorData.message || "Invalid credentials"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(`Login failed: ${errorData?.message || "An unexpected error occurred"}`);
    } finally {
      setIsLoading(false);
    }
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
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              select
              label="Select Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="alumni">Alumni</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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

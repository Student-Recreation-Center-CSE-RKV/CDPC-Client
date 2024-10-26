import React from "react";
import { Container, Typography, Button, Grid, Box, Link, List, ListItem, ListItemText } from "@mui/material";
import { motion } from "framer-motion";

// Resources array with image and description
const resources = [
  {
    name: "LeetCode",
    url: "https://leetcode.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    description: "Practice coding challenges on LeetCode to prepare for coding interviews.",
  },
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org",
    image: "https://img.icons8.com/color/512w/GeeksforGeeks.png",
    description: "A comprehensive platform for learning coding, algorithms, and data structures.",
  },
  {
    name: "HackerRank",
    url: "https://www.hackerrank.com",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png",
    description: "Improve your coding skills with challenges across multiple domains.",
  },
  {
    name: "CodeChef",
    url: "https://www.codechef.com",
    image: "https://s3.amazonaws.com/codechef_shared/sites/all/themes/abessive/cc-logo.png",
    description: "A competitive programming platform that hosts contests and provides a vast collection of problems for coding practice."
  },
  {
    name: "Codewars",
    url: "https://www.codewars.com",
    image: "data:image/jpeg;base64,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",
    description: "Sharpen your coding skills with martial arts-themed coding challenges.",
  },
  {
    name: "Exercism",
    url: "https://exercism.org",
    image: "https://avatars.githubusercontent.com/u/5624255?s=200&v=4",
    description: "Practice code in 60+ programming languages with real-time mentorship.",
  }
 
];

// Best Coding Tips array
const codingTips = [
    "Break problems down into smaller, more manageable pieces.",
    "Write clean, readable, and well-organized code, accompanied by comments.",
    "Engage in regular practice and continuously learn from your mistakes.",
    "Utilize version control systems (such as Git) for every project you work on.",
    "Prioritize developing strong problem-solving skills over memorizing syntax.",
    "Thoroughly test your code using a variety of inputs, including edge cases."


];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const CodingPracticePage = () => {
  const handleMockTest = () => {
    window.open("https://www.hackerrank.com/interview/interview-preparation-kit", "_blank");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        minHeight: "100vh",
        background: "#f8f9fa", // Soft gradient background
        paddingTop: "20px",
      }}
    >
      <Container maxWidth="md">
        <motion.div variants={itemVariants}>
          <br /> <br /> <br /><br /><br /><br />
          <Typography variant="h4" gutterBottom align="center" component={motion.h4}>
            Improve Your Coding Skills with the Best Resources
          </Typography>
          <Typography variant="body1" gutterBottom align="center">
            Explore a range of platforms to practice coding daily and test your skills with real-time challenges.
          </Typography> <br /><br/>
        </motion.div>
            
        {/* Resources Section */}
        <Grid container spacing={4} justifyContent="center" component={motion.div}>
          {resources.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.name}>
              <motion.div variants={itemVariants}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    height: "300px",
                    backgroundColor: "linear-gradient(135deg, #FFB6C1 0%, #FFCC99 100%)", //#e0f7fa
                    borderRadius: 3,
                    boxShadow: "0 4px 8px rgba(255, 120, 130, 0.5)",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.3s ease-in-out",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={resource.image}
                    alt={resource.name}
                    sx={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "contain",
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {resource.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph align="center">
                    {resource.description}
                  </Typography>
                  <Link href={resource.url} target="_blank" rel="noopener" underline="none">
                    Visit {resource.name}
                  </Link>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>

         {/* Best Coding Tips Section */}
         <motion.div variants={itemVariants} style={{ marginTop: "40px" , backgroundColor: "#ffe0b2"}}><br />
          <Typography variant="h5" gutterBottom align="center">
          Tips for Best Coding Practices
          </Typography>
           
          <List style={{ paddingLeft: "20px", listStyleType: "disc"}}>
            {codingTips.map((tip, index) => (
              <ListItem key={index} component={motion.div} variants={itemVariants}>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </motion.div>

        {/* Mock Test Button */}
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleMockTest}
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Take a Mock Coding Test
            </Button>
          </motion.div>
        </Grid>
         {/* Motivational Quote */}
         <motion.div variants={itemVariants} style={{ marginTop: "20px", textAlign: "center" }}>
          <Typography variant="subtitle1" color="textSecondary" fontStyle="italic">
            "The only way to learn a new programming language is by writing programs in it." – Dennis Ritchie
          </Typography>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default CodingPracticePage;

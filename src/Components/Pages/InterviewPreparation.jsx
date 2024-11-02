import React from 'react';
import { Container, Typography, Box, Grid, Paper, Link, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function InterviewPreparationPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 5 }}>
        <br /><br /><br />
        <Typography variant="h3" component="h1" gutterBottom>
          Interview Preparation Hub
        </Typography>
        <Typography variant="subtitle1">
          Your Guide to Acing the Interview Process
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section - Technical Interview Prep */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Technical Interview Prep
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Paper sx={{ p: 2, height: '150px', backgroundColor: '#e0f7fa', boxShadow: 3 }}>
                <Typography variant="h6">Coding Platforms</Typography>
                <Link href="https://leetcode.com" target="_blank">LeetCode</Link><br />
                <Link href="https://hackerrank.com" target="_blank">HackerRank</Link><br />
                <Link href="https://codesignal.com" target="_blank">CodeSignal</Link>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Paper sx={{ p: 2, height: '150px', backgroundColor: '#f1f8e9', boxShadow: 3 }}>
                <Typography variant="h6">Language-Specific Resources</Typography>
                <Link href="https://javascript.info" target="_blank">JavaScript</Link><br />
                <Link href="https://realpython.com" target="_blank">Python</Link><br />
                <Link href="https://docs.oracle.com/javase/tutorial/" target="_blank">Java</Link>
              </Paper>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Paper sx={{ p: 2, height: '150px', backgroundColor: '#fff3e0', boxShadow: 3 }}>
                <Typography variant="h6">Data Structures & Algorithms</Typography>
                <Link href="https://www.geeksforgeeks.org/data-structures/" target="_blank">GeeksforGeeks</Link><br />
                <Link href="https://visualgo.net/en" target="_blank">Visual Algo</Link><br />
                <Link href="https://www.youtube.com/user/mycodeschool" target="_blank">MyCodeSchool</Link>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section - Behavioral Interview Prep */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Behavioral Interview Prep
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 2, backgroundColor: '#fce4ec', boxShadow: 3 }}>
            <Typography variant="h6">STAR Method</Typography>
            <Typography paragraph>
              Use the STAR method (Situation, Task, Action, Result) to structure answers to behavioral questions.
            </Typography>
            <Typography variant="h6">Common Questions</Typography>
            <ul>
              <li>Tell me about a time when you faced a challenging situation at work.</li>
              <li>Describe a time you showed leadership.</li>
              <li>How do you handle tight deadlines?</li>
            </ul>
          </Paper>
        </motion.div>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section - System Design */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          System Design
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 2, backgroundColor: '#e8eaf6', boxShadow: 3 }}>
            <Typography variant="h6">Key Concepts</Typography>
            <Link href="https://www.educative.io/courses/grokking-the-system-design-interview" target="_blank">
              Grokking System Design
            </Link><br />
            <Link href="https://www.youtube.com/c/SystemDesignPrimer" target="_blank">
              System Design Primer
            </Link>
          </Paper>
        </motion.div>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section - Mock Interviews */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Mock Interviews
        </Typography>
        <motion.div whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Paper sx={{ p: 2, backgroundColor: '#fffde7', boxShadow: 3 }}>
            <Link href="https://www.pramp.com/" target="_blank">Pramp</Link><br />
            <Link href="https://interviewing.io/" target="_blank">Interviewing.io</Link>
          </Paper>
        </motion.div>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Section - Additional Resources with Swiper */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          Additional Resources
        </Typography>
        <Swiper spaceBetween={10} slidesPerView={1}>
          <SwiperSlide>
            <Paper sx={{ p: 2, backgroundColor: '#e0f2f1', boxShadow: 3 }}>
              <Link href="https://www.themuse.com/advice/ultimate-guide-to-interviewing" target="_blank">
                Ultimate Guide to Interviewing
              </Link>
            </Paper>
          </SwiperSlide>
          <SwiperSlide>
            <Paper sx={{ p: 2, backgroundColor: '#e1bee7', boxShadow: 3 }}>
              <Link href="https://www.indeed.com/career-advice/interviewing" target="_blank">
                Interview Tips and Tricks - Indeed
              </Link>
            </Paper>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Container>
  );
}

export default InterviewPreparationPage;


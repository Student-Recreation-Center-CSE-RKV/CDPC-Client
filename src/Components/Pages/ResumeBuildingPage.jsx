import React from "react";
import { Typography, Container, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Link } from "@mui/material";
import StarIcon from '@mui/icons-material/Star'; // Star icon
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import BrushIcon from '@mui/icons-material/Brush';

// Custom styles
const styles = {
  backgroundImage: {
    backgroundImage: 'url(https://media.istockphoto.com/id/1149054436/photo/business-man-review-his-resume-application-on-desk-laptop-computer-job-seeker.jpg?s=612x612&w=0&k=20&c=2M_xMNkuEZkg8-zy9dzP16VX8tHRbmghJtE3g6zPR5g=)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 0',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light transparency
  },
  content: {
    position: 'relative', // To ensure content is above the background and overlay
    zIndex: 1,
  },
  headerImage: {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  tipsSection: {
    marginTop: '2rem',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  card: {
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    padding:'10px',
    transition: 'box-shadow 0.3s ease',
    '&:hover':{
        boxShadow:'0 6px 12px rgba(255,192,203,0.2)',
    },
    textDecoration:'none',
    color:'black',
    backgroundColor:'rgb(255,255,224,0.6)',
  },
  icon:{
    fontSize:'2rem',
    marginRight:'10px',
  },
  titleStyle: {
    fontFamily: "'Poppins', sans-serif", // Apply a modern font like Poppins
    fontWeight: 700,
  },
  imageRight: {
    width: '100%', // Ensure full width on small screens
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px', // Add margin for spacing on smaller screens
  },
  textLeft: {
    paddingRight: '20px',
  },
};

const ResumeBuildingPage = () => {
  return (
    <div style={styles.backgroundImage}>
      {/* Overlay */}
      <div style={styles.overlay}></div>

      <Container maxWidth="md" style={styles.content}>
        {/* Title */}<br /><br />
        <Typography variant="h3" align="center" gutterBottom style={styles.titleStyle}>
          Resume Building
        </Typography>

        {/* Resources and Image Section */}
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Best Resources for Resume Creation
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <StarIcon style={{ color: '#808080' }} /> {/* Gold star */}
                </ListItemIcon>
                <ListItemText primary="LinkedIn Resume Builder: A professional tool for building resumes using your LinkedIn profile." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StarIcon style={{ color: '#808080' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href="https://www.canva.com/resumes/" target="_blank" rel="noopener">
                      Canva: Easy-to-use platform for designing creative resumes.
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StarIcon style={{ color: '#808080' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href="https://www.novoresume.com/" target="_blank" rel="noopener">
                      Novoresume: Professional resume templates and guidance for building effective resumes.
                    </Link>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <StarIcon style={{ color: '#808080' }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Link href="https://www.youtube.com/results?search_query=how+to+make+a+resume" target="_blank" rel="noopener">
                      YouTube: Video tutorials for resume creation.
                    </Link>
                  }
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <img
              src="https://media.istockphoto.com/id/1149054436/photo/business-man-review-his-resume-application-on-desk-laptop-computer-job-seeker.jpg?s=612x612&w=0&k=20&c=2M_xMNkuEZkg8-zy9dzP16VX8tHRbmghJtE3g6zPR5g="
              alt="Resume Tips"
              style={styles.imageRight}
            />
          </Grid>
        </Grid>

        {/* Resources Section */}
        <Typography variant="h5" gutterBottom>
          More Resources for Resume Preparation
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Link href="https://www.linkedin.com/resume-builder" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
            <Card style={styles.card}>
              <CardContent>
                <Grid container alignItems="center">
                <LinkedInIcon style={{ ...styles.icon, color: '#0077b5' }} />
                <Typography variant="h6">LinkedIn Resume Builder</Typography>
                </Grid>
                <Typography>
                  A tool to build and download a professional resume using your LinkedIn profile.
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
          <Link href="https://www.canva.com/resumes" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
            <Card style={styles.card}>
              <CardContent>
              <Grid container alignItems="center">
              <BrushIcon style={{ ...styles.icon, color: '#00c4cc' }} />
                <Typography variant="h6">Canva</Typography>
                </Grid>
                <Typography>
                  Design creative resumes with templates and easy drag-and-drop tools.
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        </Grid>

        {/* Tips Section */}
        <div style={styles.tipsSection}>
          <Typography variant="h5" gutterBottom>
            Resume Tips
          </Typography>
          <List>
            {[
              "Keep it concise and to the point (1-2 pages maximum).",
              "Highlight key achievements and skills relevant to the job.",
              "Use bullet points for easy readability.",
              "Tailor your resume for each job application.",
              "Include keywords from the job description for better ATS compatibility.",
            ].map((tip, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <StarIcon style={{ color: '#FFD700' }} /> {/* Gold star */}
                </ListItemIcon>
                <ListItemText primary={tip} />
              </ListItem>
            ))}
          </List>
        </div>
      </Container>
    </div>
  );
};

export default ResumeBuildingPage;
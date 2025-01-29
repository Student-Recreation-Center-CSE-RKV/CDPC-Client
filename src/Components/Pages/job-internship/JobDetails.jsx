import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    Chip,
    IconButton
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  const JobDetails = ({ job, onClose }) => {
    if (!job) return null;
  
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          overflowY: "auto",
        }}
      >
        <Card sx={{ width: "90%", padding: 3, backgroundColor: "white", maxHeight: "90vh", overflowY: "auto" }}>
            {/* Close Icon Button */}
            <IconButton
            onClick={onClose}
            sx={{
                position: "absolute",
                top: { xs: 40, sm: 35, md: 35 }, // Responsive positioning for top
                right: { xs: 25, sm: 50, md: 80 }, // Responsive positioning for right
                fontSize: { xs: 24, sm: 50, md: 50 }, // Responsive font size for different screens
                color: "gray",
                "&:hover": {
                color: "black", // Change color on hover for better UX
                },
            }}
            >
            <CloseIcon />
            </IconButton>

          <CardContent>
            {/* Job Details & Company Details (Dynamic Layout) */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              {/* Job Details Section (Left) */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {job.title}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {job.location} ({job.locationType})
                </Typography>
                <Typography variant="body1">
                  <strong>Salary/Stipend:</strong> {job.salaryRange}
                </Typography>
                <Typography variant="body1">
                  <strong>Eligibility:</strong> {job.eligibilityCriteria}
                </Typography>
                <Typography variant="body1">
                  <strong>Batch:</strong> {job.batch.join(", ")}
                </Typography>
                <Typography variant="body1">
                  <strong>Branches:</strong> {job.branches.join(", ")}
                </Typography>
                <Typography variant="body1">
                  <strong>Deadline:</strong> {new Date(job.deadline).toDateString()}
                </Typography>
              </Box>
  
              {/* Company Details Section (Right for md+, Top for xs) */}
              {job.company && (
                <Box
                  sx={{
                    flex: { md: 0.4 },
                    textAlign: { xs: "center", md: "left" },
                    mt: { xs: 2, md: 0 },
                    alignSelf: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Typography variant="body1">
                    <strong>Company:</strong> {job.company.name}
                  </Typography>
                  {job.company.logo && (
                    <Box sx={{ my: 1, display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                      <img src={job.company.logo} alt={job.company.name} width="80px" />
                    </Box>
                  )}
                  {job.company.website && (
                    <Typography variant="body1">
                      <strong>Website:</strong>{" "}
                      <a href={job.company.website} target="_blank" rel="noopener noreferrer">
                        {job.company.website}
                      </a>
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
  
            {/* Job Description */}
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Description:</strong> {job.jobDescription}
            </Typography>
  
            {/* Required Skills with Chips */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Required Skills
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "nowrap", overflowX: "auto", pb: 1 }}>
              {job.requiredSkills.map((skill, index) => (
                <Chip key={index} label={skill} sx={{ whiteSpace: "nowrap" }} />
              ))}
            </Box>
  
            {/* Recruitment Process */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Recruitment Process
            </Typography>
            <List>
              {job.recruitmentProcess.map((round) => (
                <ListItem key={round._id} sx={{ pl: 0 }}>
                  <ListItemText
                    primary={`Round ${round.round}: ${round.description}`}
                    secondary={round.date ? new Date(round.date).toDateString() : ""}
                  />
                </ListItem>
              ))}
            </List>
  
            {/* Contact Email */}
            <Typography variant="body1">
              <strong>Contact:</strong> {job.contactEmail}
            </Typography>
          </CardContent>
  
          {/* Close Button */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button onClick={onClose} variant="contained" color="secondary">
              Close
            </Button>
          </Box>
        </Card>
      </Box>
    );
  };
  
  export default JobDetails;
  
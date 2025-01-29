import React, { useState } from 'react';
import { Box, Typography, Radio, RadioGroup,FormControl ,TextField, Button, Grid, Card, CardContent, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const EditableJobDetails = ({ job, onSave, onCancel }) => {
    // console.log(job.deadline);
    const [formData, setFormData] = useState({
        title: job?.title || '',
        location: job?.location || '',
        locationType: job?.locationType || 'Remote',
        salaryRange: job?.salaryRange || '',
        jobDescription: job?.jobDescription || '',
        eligibilityCriteria: job?.eligibilityCriteria || '',
        batch: Array.isArray(job?.batch) ? job.batch : [],
        branches: Array.isArray(job?.branches) ? job.branches : [],
        requiredSkills: Array.isArray(job?.requiredSkills) ? job.requiredSkills : [], // ✅ Ensure array
        deadline: job?.deadline || '',
        jobType: job?.jobType || 'Full-time',
        recruitmentProcess: Array.isArray(job?.recruitmentProcess) ? job.recruitmentProcess : [],
        contactEmail: job?.contactEmail || '',
        isActive: job?.isActive ?? true, // Use `??` to handle false values properly
      });
    // console.log(formData.requiredSkills);      
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      
      const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value.split(",").map((skill) => skill.trim()), // Convert string to array
        }));
      };
      
    
      const handleRecruitmentChange = (index, field, value) => {
        setFormData((prevData) => {
          const updatedRecruitmentProcess = [...prevData.recruitmentProcess];
          updatedRecruitmentProcess[index] = { ...updatedRecruitmentProcess[index], [field]: value };
          return { ...prevData, recruitmentProcess: updatedRecruitmentProcess };
        });
      };
    
      const addRecruitmentRound = () => {
        setFormData((prevData) => ({
          ...prevData,
          recruitmentProcess: [...prevData.recruitmentProcess, { round: '', description: '', date: '' }],
        }));
      };
    
      const handleSubmit = () => {
        onSave(formData);
      };
    

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay effect
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
        <Card sx={{ width: "90%", padding: 3, backgroundColor: "white", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <IconButton onClick={onCancel} sx={{ position: "absolute", top: 20, right: 20, color: "gray", '&:hover': { color: "black" } }}>
            <CloseIcon />
            </IconButton>
            <CardContent>
            <Typography variant="h4" mb={3}>Edit Job Details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}><TextField label="Job Title" name="title" value={formData.title} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Salary Range" name="salaryRange" value={formData.salaryRange} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Batches (comma separated)" name="batch" value={formData.batch.join(', ')} onChange={handleArrayChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Branches  (comma separated)" name="branches" value={formData.branches.join(', ')} onChange={handleArrayChange} fullWidth /></Grid>
                <Grid item xs={12}><TextField label="Job Description" name="jobDescription" value={formData.jobDescription} onChange={handleChange} fullWidth multiline rows={4} /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Eligibility Criteria" name="eligibilityCriteria" value={formData.eligibilityCriteria} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Required Skills (comma separated)" name="requiredSkills" value={formData.requiredSkills.join(', ')} onChange={handleArrayChange} fullWidth /></Grid>
                <Grid item xs={12} sm={6}><TextField label="Application Deadline" type="date" name="deadline" value={formData.deadline?formData.deadline.split("T")[0] : ""} onChange={handleChange} InputLabelProps={{
    shrink: true, // Ensures label doesn't overlap the date picker
  }} fullWidth /></Grid>
                <Grid item xs={12}><Typography variant="body1">Job Type:</Typography>
                <FormControlLabel control={<Checkbox checked={formData.jobType === 'Full-time'} onChange={() => setFormData({ ...formData, jobType: 'Full-time' })} />} label="Full-time" />
                <FormControlLabel control={<Checkbox checked={formData.jobType === 'Internship'} onChange={() => setFormData({ ...formData, jobType: 'Internship' })} />} label="Internship" />
                </Grid>
                <Grid item xs={12} >
                <Typography variant="body1">Is Active:</Typography>
                <FormControl component="fieldset">
                    <RadioGroup
                    aria-label="isActive"
                    name="isActive"
                    value={formData.isActive ? 'Active' : 'Inactive'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'Active' })}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                    >
                    <FormControlLabel
                        value="Active"
                        control={<Radio />}
                        label="Active"
                    />
                    <FormControlLabel
                        value="Inactive"
                        control={<Radio />}
                        label="Inactive"
                    />
                    </RadioGroup>
                </FormControl>
                </Grid>
                <Grid item xs={12}><Typography variant="body1">Recruitment Process:</Typography>
                {formData.recruitmentProcess.map((round, index) => (
                    <Box key={index} mb={2}>
                    <TextField label="Round Number" type="number" value={round.round} onChange={(e) => handleRecruitmentChange(index, 'round', e.target.value)} fullWidth />
                    <TextField label="Description" value={round.description} onChange={(e) => handleRecruitmentChange(index, 'description', e.target.value)} fullWidth multiline rows={2} />
                    <TextField label="Date" type="date" value={round.date?round.date.split("T")[0] : ""} onChange={(e) => handleRecruitmentChange(index, 'date', e.target.value)} InputLabelProps={{
    shrink: true, // Ensures label doesn't overlap the date picker
  }} fullWidth />
                    </Box>
                ))}
                <Button onClick={addRecruitmentRound} variant="outlined">Add Round</Button>
                </Grid>
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button onClick={onCancel} variant="outlined" sx={{ mr: 2 }}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">Save Changes</Button>
                </Box>
            </Grid>
            </CardContent>
        </Card>
    </Box>
  );
};

export default EditableJobDetails;

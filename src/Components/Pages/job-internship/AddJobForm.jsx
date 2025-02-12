import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Grid, Card, CardContent, IconButton, Checkbox, FormControlLabel, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const AddJobForm = ({ onCancel,refresh }) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        locationType: 'Remote',
        salaryRange: '',
        jobDescription: '',
        eligibilityCriteria: '',
        batch: [],
        branches: [],
        requiredSkills: [],
        deadline: '',
        jobType: 'Full-time',
        recruitmentProcess: [],
        contactEmail: '',
        company: '',
    });

    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        // Fetch companies from API
        axios.get('http://localhost:8000/api/companies/')
            .then((response) => {
                setCompanies(response.data.data);
                // console.log(response)
            })
            .catch((error) => {
                console.error('Error fetching companies:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleArrayChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.split(',').map((item) => item.trim()),
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

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:8000/api/jobs-internships/add', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true, 
            });
            alert("Job created successfully");
            // console.log('Job created successfully:', response.data);
            onCancel();
            refresh();
        } catch (error) {
            console.error('Error creating job:', error);
        }
    };


    return (
        <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, overflowY: "auto" }}>
            <Card sx={{ width: "90%", padding: 3, backgroundColor: "white", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
                <IconButton onClick={onCancel} sx={{ position: "absolute", top: 20, right: 20, color: "gray", '&:hover': { color: "black" } }}>
                    <CloseIcon />
                </IconButton>
                <CardContent>
                    <Typography variant="h4" mb={3} sx={{textAlign:"center"}}>Add New Job</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}><TextField label="Job Title" name="title" value={formData.title} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Salary Range" name="salaryRange" value={formData.salaryRange} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Batches (comma separated)" name="batch" value={formData.batch.join(', ')} onChange={handleArrayChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Branches  (comma separated)" name="branches" value={formData.branches.join(', ')} onChange={handleArrayChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><Typography variant="body1">Job Type:</Typography>
                            <FormControlLabel control={<Checkbox checked={formData.jobType === 'Full-time'} onChange={() => setFormData({ ...formData, jobType: 'Full-time' })} />} label="Full-time" />
                            <FormControlLabel control={<Checkbox checked={formData.jobType === 'Internship'} onChange={() => setFormData({ ...formData, jobType: 'Internship' })} />} label="Internship" />
                        </Grid>
                        <Grid item xs={12}><TextField label="Job Description" name="jobDescription" value={formData.jobDescription} onChange={handleChange} fullWidth multiline rows={4} /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Eligibility Criteria" name="eligibilityCriteria" value={formData.eligibilityCriteria} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Contact Email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Required Skills (comma separated)" name="requiredSkills" value={formData.requiredSkills.join(', ')} onChange={handleArrayChange} fullWidth /></Grid>
                        <Grid item xs={12} sm={6}><TextField label="Application Deadline" type="date" name="deadline" value={formData.deadline} onChange={handleChange} InputLabelProps={{ shrink: true }} fullWidth /></Grid>
                       
                        <Grid container spacing={2}>
                        {/* Location Type */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Location Type:</Typography>
                            <Select 
                                name="locationType" 
                                value={formData.locationType} 
                                onChange={handleChange} 
                                fullWidth 
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    '&:hover': { borderColor: 'primary.main' },
                                }}
                            >
                                <MenuItem value="Remote">Remote</MenuItem>
                                <MenuItem value="On-site">On-site</MenuItem>
                                <MenuItem value="Hybrid">Hybrid</MenuItem>
                            </Select>
                        </Grid>

                        {/* Company */}
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Company:</Typography>
                            <Select 
                                name="company" 
                                value={formData.company} 
                                onChange={handleChange} 
                                fullWidth 
                                sx={{
                                    backgroundColor: 'white',
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    '&:hover': { borderColor: 'primary.main' },
                                }}
                            >
                                {companies?.map((company) => (
                                    <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>

                        <Grid item xs={12}><Typography variant="body1">Recruitment Process:</Typography>
                            {formData.recruitmentProcess.map((round, index) => (
                                <Box key={index} mb={2}>
                                    <TextField label="Round Number" type="number" value={round.round} onChange={(e) => handleRecruitmentChange(index, 'round', e.target.value)} fullWidth />
                                    <TextField label="Description" value={round.description} onChange={(e) => handleRecruitmentChange(index, 'description', e.target.value)} fullWidth multiline rows={2} />
                                    <TextField label="Date" type="date" value={round.date} onChange={(e) => handleRecruitmentChange(index, 'date', e.target.value)} InputLabelProps={{ shrink: true }} fullWidth />
                                </Box>
                            ))}
                            <Button onClick={addRecruitmentRound} variant="outlined">Add Round</Button>
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                            <Button onClick={onCancel} variant="outlined">Cancel</Button>
                            <Button onClick={handleSubmit} variant="contained" color="primary">Add Job</Button>
                        </Box>
                    </Box>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddJobForm;

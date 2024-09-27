// src/components/JobInterview.js

import React, {useState} from 'react';
import './App.css';
import {Typography,AppBar,Box,TextField,Card,CardActions,CardContent,CssBaseline,Toolbar,Container,Grid2, CardMedia} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
//import ButtonGroup from '@mui/material/ButtonGroup';
//import { makeStyles } from '@mui/styles';
//import { ThemeProvider, createTheme } from '@mui/material/styles';


const cards=[1,2,3,4,5,6,7,8,9]
const EventsWorkshops=()=>{
  const[formData , setFormData]=
  useState({
    name:"",
    email:"",
    eventname:"",
    feedback:"",
  });
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit=(e) => {
    e.preventDefault();
    //Process the form Data
    console.log(formData);
  }

  return(
   <>
      <CssBaseline/>
      <AppBar position="relative">
          <Toolbar>
            <EventIcon/>
            <Typography variant="h6">
                Events 
            </Typography>
          </Toolbar>
      </AppBar>
      <main>
        <div >
          <Container maxwidth="sm" >
              <Typography variant="h4" align="center" color="textPrimary" style={{marginTop:"30px"}} gutterBottom>
                Upcoming Events and Workshops
              </Typography>
              <Typography  align="center" color="textSecondary" component="p">
                  Events and workshop are organized everyweek to gain knowledge from industry experts
              </Typography>
     
          <div className="button">
          <Grid2 container spacing={2} justify="center" style={{marginLeft:"400px" , marginTop:"20px"}}>
            <Grid2 item>
              <Button variant="contained" color="primary">
                Upcoming Events
              </Button>
            </Grid2>
            <Grid2 item>
              <Button variant="outlined" color="primary">
                Past Events
              </Button>
            </Grid2>
          </Grid2>
          </div>
        </Container>
        </div>
        <Container className="cardGrid" maxwidth="md">
          <Grid2 container spacing={4}>
            {cards.map((card)=>(
                            <Grid2 item key={card} md={3}>
                            <Card className="card">
                              <CardMedia className="cardMedia"
                                image="https://img.freepik.com/free-photo/high-angle-kid-cheating-school-test_23-2150105088.jpg?size=626&ext=jpg&ga=GA1.1.261979986.1706893834&semt=ais_hybrid"
                                title="image title"
                              />
                              <CardContent className="cardContent">
                                <Typography gutterBottom variant="h5">
                                    Heading
                                </Typography>
                                <Typography>
                                  upcoming workshop on aptitude hjgh
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Link to="/registration">
                                <Button size="small" color="primary">Register now</Button>
                                </Link>                     
                                <Button size="small" color="primary">View More</Button>
                              </CardActions>
            
                            </Card>
                        </Grid2>

            ))}
            
          </Grid2>

        </Container>
      </main>
       <Container maxWidth="sm">
        <Box sx={{mt:2}}>
          <Typography variant="h4"  color="primary"  gutterBottom>
            Feedback Form
          </Typography>
          <form onSubmit={handleSubmit}>
           
              <Grid2 item xs={12}>
                <TextField label="Name" name="name" variant="outlined" type="text" value={formData.name} onChange={handleChange} sx={{margin:2}} fullWidth required/>
              </Grid2>
              <Grid2 item xs={12}>
                <TextField fullWidth label="Email" name="email" type="email" variant="outlined" value={formData.email} onChange={handleChange} sx={{margin:2}} required />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField fullWidth label="EventName" name="eventname" type="text" variant="outlined" value={formData.eventname} onChange={handleChange} sx={{margin:2}} required />
              </Grid2>
              <Grid2 item xs={12}>
                <TextField fullWidth label="Feedback" name="feedback" multiline rows={4} variant="outlined" value={FormData.feedback} onChange={handleChange} sx={{margin:2}} required />
              </Grid2>
              <Grid2 item xs={12} >
                <Button variant="contained" color="primary" type="submit" onChange={handleSubmit} sx={{ marginTop:"20px", marginLeft:"150px", paddingLeft:"100px", paddingRight:"100px"}} >
                  Submit
                </Button>
              </Grid2>
            
          </form>
        </Box>
      </Container>
      
   </>
  )
}

export default EventsWorkshops;

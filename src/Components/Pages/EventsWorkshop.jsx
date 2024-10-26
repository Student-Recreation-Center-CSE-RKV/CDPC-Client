// src/components/JobInterview.js

//import React, {useState} from 'react';
import './App.css';
import './Events.css';
//import {Typography,AppBar,Box,TextField,Card,CardActions,CardContent,CssBaseline,Toolbar,Container,Grid2, CardMedia} from '@mui/material';
//import EventIcon from '@mui/icons-material/Event';
//import Button from '@mui/material/Button';
import { Link, Outlet,useLocation } from 'react-router-dom';
//import ButtonGroup from '@mui/material/ButtonGroup';
//import { makeStyles } from '@mui/styles';
//import { ThemeProvider, createTheme } from '@mui/material/styles';


import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const latestEventsData = [
  {
    id: 1,
    title: "Tech Conference 2024",
    date: "October 31, 2024",
    venue: "computer center, Cc",
    details: "Join us for the annual Tech Conference to explore the latest trends in AI, Blockchain, and Web3.",
    image: "https://media.istockphoto.com/id/1371339413/photo/co-working-team-meeting-concept-businessman-using-smart-phone-and-digital-tablet-and-laptop.jpg?s=612x612&w=0&k=20&c=ysEsVw3q2axYt3oVZAuQjtHRlN3lY-U_e0ikK5yKIXQ=", // replace with actual image
  },
  {
    id: 2,
    title: "Workshop on Gemini",
    date: "November 5, 2024",
    venue: "Computer center",
    details: "Join us for the Workshop on Gemini,where Gemini for google workspace is your AI-powered assistent that help you to research",
    image: "https://media.licdn.com/dms/image/D5612AQE3ei1i1CRWDw/article-cover_image-shrink_720_1280/0/1711112113656?e=2147483647&v=beta&t=YHHpHn5E5R_bqa2059PFdzEQ0Gi3n_glOQT2vGMFQrQ", // replace with actual image
  },
  {
    id: 3,
    title: "Workshop on Photoshop-web desinging using HTML,CSS ",
    date: "November 16, 2024",
    venue: "Computer center",
    details: "Join us for the workshop on AI",
    image: "https://i0.wp.com/howfinity.com/wp-content/uploads/2022/07/how-to-use-photoshop-for-beginners-2022.jpg?resize=288%2C180&ssl=1", // replace with actual image
  }
];

const pastEventsData = [
  {
    id: 1,
    title: "Tech Expo 2023",
    date: "August 15, 2023",
    venue: "Computer center",
    details: "A successful tech expo covering innovations in AI and robotics.",
    image: "https://www.shutterstock.com/image-photo/dubai-uae-march-16-2023-260nw-2278185557.jpg", // replace with actual image
  },
  {
    id: 2,
    title: "Art Workshop 2023",
    date: "July 10, 2023",
    venue: "Computer center, CC",
    details: "An engaging art workshop with renowned artists from across the country.",
    image: "https://img.freepik.com/free-vector/artificial-intelligence-landing-page-web-template_23-2148754156.jpg?t=st=1729705690~exp=1729709290~hmac=b38ebe3915df1c362408a9b4a7ce89d8e7c7150955f9dca15da3cd868cd06767&w=740", // replace with actual image
  },
  {
    id: 2,
    title: "Prompt Engineering Workshop",
    date: "October 21,22 , 2023",
    venue: "Computer center, CC",
    details: "An engaging AI-power Application project,BUild a chat based application",
    image: "https://thumbs.dreamstime.com/b/prompt-engineering-illustration-icons-arrows-keywords-black-chalkboard-background-329477574.jpg", // replace with actual image
  }
];

const EventWorkshop= () => {
  const [showLatest, setShowLatest] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFeedback, setIsFeedback] = useState(false); // Add a state to differentiate between Register and Feedback modal

  const handleShowLatest = () => {
    setShowLatest(true);
  };

  const handleShowPast = () => {
    setShowLatest(false);
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setIsFeedback(false); // Set this to false for registration modal
    setShowModal(true);
  };

  const handleFeedbackClick = (event) => {
    setSelectedEvent(event);
    setIsFeedback(true); // Set this to true for feedback modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle subscribing to event
  const handleSubscribe = (eventId) => {
    alert(`Subscribed to event ${eventId}!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (isFeedback) {
      alert("Feedback submitted!");
    } else {
      alert("Registration submitted!");
    }
    setShowModal(false); // Close modal after submission
  };

  const renderEvents = (events, isLatest) => {
    return events.map((event) => (
      <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={event.id}>
        <div className="card h-100">
          <img src={event.image} className="card-img-top" alt={event.title} />
          <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="card-text">
              <strong>Venue:</strong> {event.venue}
            </p>
            <p className="card-text">{event.details}</p>
            <div className="d-flex justify-content-between">
              {isLatest ? (
                <Button className="btn btn-primary btn-sm" onClick={() => handleRegisterClick(event)}>
                  Register
                </Button>
              ) : (
                <Button className="btn btn-success btn-sm" onClick={() => handleFeedbackClick(event)}>
                  Feedback
                </Button>
              )}
              <Button className="btn btn-secondary btn-sm">
                Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mt-5"><br /><br/><br/>
      <h1 className="text-center mb-4">Events and Workshops</h1>
      <p className="text-center mb-5">
        Discover our exciting events and workshops! From tech conferences to creative workshops, we offer a range of experiences to inspire and engage participants. Browse through our upcoming and past events below.
      </p>

      <div className="d-flex justify-content-center mb-4">
        <Button className={`btn btn-outline-primary mx-2 ${showLatest ? 'active' : ''}`} onClick={handleShowLatest}>
          Latest Events
        </Button>
        <Button className={`btn btn-outline-secondary mx-2 ${!showLatest ? 'active' : ''}`} onClick={handleShowPast}>
          Past Events
        </Button>
      </div>

      <div className="row">
        {showLatest ? renderEvents(latestEventsData, true) : renderEvents(pastEventsData, false)}
      </div>

      <div className="event-footer text-center p-4">
        <h5>Stay Updated on Upcoming Events</h5>
        <Form inline className="justify-content-center mt-3">
          <Form.Control type="email" placeholder="Enter your email" className="mr-2" /><br/>
          <Button variant="primary">Subscribe</Button>
        </Form>
      </div>


      {/* Modal for Registration/Feedback */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isFeedback ? `Feedback for ${selectedEvent?.title}` : `Register for ${selectedEvent?.title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter your phone number" required />
            </Form.Group>

            {isFeedback && (
              <Form.Group className="mb-3" controlId="formFeedback">
                <Form.Label>Your Feedback</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter your feedback" required />
              </Form.Group>
            )}

            <Button variant="primary" type="submit">
              Submit {isFeedback ? "Feedback" : "Registration"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EventWorkshop;



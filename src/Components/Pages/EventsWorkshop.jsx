
import React, { useState, useEffect } from "react";
import { Spinner,Modal, Button, Form,Row,Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useAuth } from "../AuthContext";
import EditIcon from '@mui/icons-material/Edit'; // Import MUI Edit icon
import DeleteIcon from '@mui/icons-material/Delete'; // Import MUI Delete icon
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

const EventWorkshop = () => {
  
  const { user } = useAuth();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [showLatest, setShowLatest] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFeedback, setIsFeedback] = useState(false);
  const [latestEventsData, setLatestEventsData] = useState([]);
  const [pastEventsData, setPastEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddEventModal, setshowAddEventModal] = useState(false);  // State to control modal visibility
  const [EventFormData, setEventFormData] = useState({
    title: "",
    date: "",
    venue: "",
    details: "",
    capacity: "",
    image: null
  });
  useEffect(() => {
    // Fetch events data from the API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/event/events");
        const events = response.data.data;
        // console.log(response.data.data);
        // Separate events into past and upcoming based on date
        const currentDate = new Date();
        const upcomingEvents = [];
        const pastEvents = [];

        events.forEach(event => {
          const eventDate = new Date(event.date);
          if (eventDate >= currentDate) {
            upcomingEvents.push(event);
          } else {
            pastEvents.push(event);
          }
        });

        setLatestEventsData(upcomingEvents);
        setPastEventsData(pastEvents);
      } catch (error) {
        console.error("Error fetching events data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Function to open the dialog and fetch event details
const handleEditClick = async (event) => {
  console.log(event.image);
  setIsUploading(true);
  try {
    const response = await axios.get(`http://localhost:8000/api/event/id/${event._id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Ensures cookies are sent along with the request
    });
  // console.log(response);  

    setSelectedEvent(response.data.data);
    setOpenEditDialog(true);
  } catch (error) {
    console.error("Failed to fetch event details:", error);
  } finally {
    setIsUploading(false);
  }
};

// Function to close the dialog
const handleCloseDialog = () => {
  setOpenEditDialog(false);
  setSelectedEvent(null);
};
  const handleEventShow = () => setshowAddEventModal(true);
  const handleEventClose = () => setshowAddEventModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventFormData({
      ...EventFormData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setEventFormData({
      ...EventFormData,
      image: e.target.files[0]
    });
  };


  const handleShowLatest = () => {
    setShowLatest(true);
  };

  const handleShowPast = () => {
    setShowLatest(false);
  };

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true)
  };

  const handleClose = () => setShowEventModal(false);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setIsFeedback(false);
    setShowModal(true);
  };

  const handleFeedbackClick = (event) => {
    setSelectedEvent(event);
    setIsFeedback(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", EventFormData.title);
    formDataToSend.append("date", EventFormData.date);
    formDataToSend.append("venue", EventFormData.venue);
    formDataToSend.append("details", EventFormData.details);
    formDataToSend.append("capacity", EventFormData.capacity);
    if (EventFormData.image) {
      formDataToSend.append("image", EventFormData.image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/event/create-event",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",  // For file uploads
          },
          withCredentials:true
        },
        
      );
      console.log(response);
      if (response.status === 201) {
        alert("Event created successfully!");
        setshowAddEventModal(false);  // Close modal after successful submission
        // Optionally, reset the form data
        setEventFormData({
          title: "",
          date: "",
          venue: "",
          details: "",
          capacity: "",
          image: null
        });
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    }finally {
      setIsUploading(false); // Stop loading
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(selectedEvent._id);
    const formData = {
      fullName: e.target.formName.value,
      email: e.target.formEmail.value,
      phone: e.target.formPhone.value,
      feedback: isFeedback ? e.target.formFeedback.value : null,
      eventId: selectedEvent?._id, // Include the event ID if necessary
    };
  
    try {
      const response = await axios.post("http://localhost:8000/api/event/registrations", formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials (cookies, authorization headers)
      });
      // console.log(response);
      if (response.status === 201) {
        alert(isFeedback ? "Feedback submitted successfully!" : "Registration submitted successfully!");
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setShowModal(false);
    }
  };
  const handleUpdateEvent = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
  
      // Append all event fields to the FormData object
      formData.append("title", selectedEvent.title);
      formData.append("date", selectedEvent.date);
      formData.append("venue", selectedEvent.venue);
      formData.append("details", selectedEvent.details);
      formData.append("capacity", selectedEvent.capacity);
  
      // Validate and append the image field
      if (selectedEvent.image instanceof File) {
        formData.append("image", selectedEvent.image);
      } else if (selectedEvent.image?.startsWith("data:image")) {
        try {
          const blob = dataURItoBlob(selectedEvent.image); // Convert base64 to Blob
          formData.append("image", blob, "event-image.jpg");
        } catch (error) {
          console.error("Failed to convert base64 string to Blob:", error);
        }
      } else {
        console.log("Image is not a File or a valid base64 string.");
      }
  
      // Make the request to update the event
      const response = await axios.post(
        `http://localhost:8000/api/event/id/${selectedEvent._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file uploads
          },
          withCredentials: true, // Include credentials like cookies
        }
      );
  
      const updatedEvent = response.data.data;
  
      alert("Event updated successfully!");
      setOpenEditDialog(false);
      setSelectedEvent(null);
  
      // Update local event data with the updated event
      setPastEventsData((prevEvents) =>
        prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
      );
      setLatestEventsData((prevEvents) =>
        prevEvents.map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
      );
    } catch (error) {
      console.error("Failed to update event:", error);
      alert("Failed to update event.");
    } finally {
      setIsUploading(false);
    }
  };
  
  // Helper function to convert base64 to Blob
  const dataURItoBlob = (dataURI) => {
    try {
      const [header, data] = dataURI.split(",");
      if (!header || !data) {
        throw new Error("Invalid data URI format.");
      }
      const byteString = atob(data);
      const mimeString = header.split(":")[1].split(";")[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uintArray = new Uint8Array(arrayBuffer);
  
      for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
      }
  
      return new Blob([uintArray], { type: mimeString });
    } catch (error) {
      console.error("Invalid base64 string:", error);
      throw error;
    }
  };
  
  const handleDeleteClick = async (event) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the event: ${event.title}?`);
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`http://localhost:8000/api/event/id/${event._id}`, {
        withCredentials: true, // Include credentials if required
      });
  
      if (response.status === 200) {
        alert("Event deleted successfully!");
        
        // Remove the deleted event from the list
        setPastEventsData((prevEvents) => prevEvents.filter((e) => e._id !== event._id));
        setLatestEventsData((prevEvents) => prevEvents.filter((e) => e._id !== event._id));
      } else {
        alert("Failed to delete the event. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while trying to delete the event.");
    }
  };
  
  const renderEvents = (events, isLatest) => {
    return events.map((event) => (
      <div className={`col-lg-${user?.userType === "admin" ? 4 : 3} col-md-6 col-sm-12 mb-4`} key={event._id} >
        <div className="card h-100">
          {/* <img src={event.image} className="card-img-top" alt={event.title} /> */}
          <img 
            src={event.image} 
            className="card-img-top" 
            alt={event.title} 
            style={{ width: "100%", height: "200px", objectFit: "cover" }} 
          />
          <div className="card-body">
            <h5 className="card-title">{event.title}</h5>
            <p className="card-text">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
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
              <Button className="btn btn-secondary btn-sm" onClick={()=>handleShow(event)}>Details</Button>
              {/* Conditionally render Edit and Delete buttons for admins */}
            {user?.userType === 'admin' && (
              <div className="d-flex">
                <Button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditClick(event)}
                  
                >
                  <EditIcon />
                </Button>
                <Button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(event)}
                  
                >
                  <DeleteIcon />
                </Button>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    ));
  };

  if (isLoading) {
    return <div className="text-center">Loading events...</div>;
  }

  return (
    <div className="container " style={{marginTop:100}}>
      <h1 className="text-center  mb-4">Events and Workshops</h1>
      <p className="text-center mb-5 " style={{ fontSize:{md:"18px" , sm:"16px"} }}>
        Discover our exciting events and workshops! From tech conferences to creative workshops, we offer a range of experiences to inspire and engage participants. Browse through our upcoming and past events below.
      </p>
      <div className="d-flex flex-column align-items-center mb-4">
        <div className=" mb-4">
        {user?.userType==="admin" && <Button
          className="mx-2 bg-primary text-white"
          onClick={handleEventShow}
        >
          ADD EVENT
        </Button>}
        </div>
        <div className="d-flex justify-content-center mb-4">
        <Button
          className={`mx-2 ${showLatest ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          onClick={handleShowLatest}
        >
          Latest Events
        </Button>
        <Button
          className={`mx-2 ${!showLatest ? 'bg-primary text-white' : 'bg-white text-primary border-primary'}`}
          onClick={handleShowPast}
        >
          Past Events
        </Button>
        </div>
      </div>
      <div className="row">
        {showLatest ? renderEvents(latestEventsData, true) : renderEvents(pastEventsData, false)}
      </div>

      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Event</DialogTitle>
        {isUploading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          </div>
        ) : (
          <DialogContent>
            <form>
              <TextField
                fullWidth
                margin="normal"
                label="Event Title"
                value={selectedEvent?.title || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Date"
                type="date"
                value={selectedEvent?.date?.split("T")[0] || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Venue"
                value={selectedEvent?.venue || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, venue: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Details"
                multiline
                rows={4}
                value={selectedEvent?.details || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, details: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Capacity"
                type="number"
                value={selectedEvent?.capacity || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, capacity: e.target.value })}
              />
               {/* Image Section */}
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <label htmlFor="image-upload">
                <strong>Event Image:</strong>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "block", margin: "16px auto" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setSelectedEvent({ ...selectedEvent, image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {selectedEvent?.image && (
                <div>
                  <strong>Preview:</strong>
                  <img
                    src={selectedEvent.image}
                    alt="Event Preview"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginTop: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
            </form>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateEvent} variant="success">
            Save
          </Button>
        </DialogActions>
    </Dialog>


      {/* Modal to Add Event */}
      <Modal
        show={showAddEventModal}
        onHide={handleEventClose}
        size="md" // You can use "sm", "lg", or "xl" to control modal size
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleEventSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Event Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter event title"
            name="title"
            value={EventFormData.title}
            onChange={handleInputChange}
            required
            size="sm"
          />
        </Form.Group>

  {/* Row to place Date and Venue side by side */}
  <Row>
    <Col sm={6}> {/* 6 columns for Date */}
      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={EventFormData.date}
          onChange={handleInputChange}
          required
          size="sm"
        />
      </Form.Group>
    </Col>
    <Col sm={6}> {/* 6 columns for Venue */}
      <Form.Group className="mb-3" controlId="formVenue">
        <Form.Label>Venue</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter venue"
          name="venue"
          value={EventFormData.venue}
          onChange={handleInputChange}
          required
          size="sm"
        />
      </Form.Group>
    </Col>
  </Row>

  <Form.Group className="mb-3" controlId="formDetails">
    <Form.Label>Event Details</Form.Label>
    <Form.Control
      as="textarea"
      rows={2}
      placeholder="Enter event details"
      name="details"
      value={EventFormData.details}
      onChange={handleInputChange}
      required
      size="sm"
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formCapacity">
    <Form.Label>Capacity</Form.Label>
    <Form.Control
      type="number"
      placeholder="Enter capacity"
      name="capacity"
      value={EventFormData.capacity}
      onChange={handleInputChange}
      required
      size="sm"
    />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formImage">
    <Form.Label>Event Image</Form.Label>
    <Form.Control
      type="file"
      name="image"
      onChange={handleFileChange}
      size="sm"
    />
  </Form.Group>

  <Button variant="primary" type="submit" size="sm" disabled={isLoading}>
            {isUploading ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Submit'
            )}
  </Button>
</Form>

        </Modal.Body>
      </Modal>

        {/* Modal for displaying event details */}
        <Modal show={showEventModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign:"center"}}>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent ? (
            <div >
              <p>
                <strong>Title:</strong> {selectedEvent.title}
              </p>
              <p>
                <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Venue:</strong> {selectedEvent.venue}
              </p>
              <p>
                <strong>Capacity:</strong> {selectedEvent.capacity}
              </p>
              <p>
                <strong>Registered Count:</strong> {selectedEvent.registeredCount}
              </p>
              <p>
                <strong>Details:</strong> {selectedEvent.details}
              </p>
            </div>
          ) : (
            <p>No event selected.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Registration/Feedback */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isFeedback ? `Feedback for ${selectedEvent?.title}` : `Register for ${selectedEvent?.title}`}
          </Modal.Title>
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



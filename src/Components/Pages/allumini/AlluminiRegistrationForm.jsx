import React, { useState } from 'react';
import './AlumniRegistrationForm.css';

function AlumniRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    graduationYear: '',
    department: '',
    currentPosition: '',
    company: '',
    email: '',
    linkedIn: '',
    testimonial: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log('Alumni Registered:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="alumni-registration-form">
      <h2>Alumni Registration</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Graduation Year:</label>
      <input
        type="number"
        name="graduationYear"
        value={formData.graduationYear}
        onChange={handleChange}
        required
        min="1900"
        max={new Date().getFullYear()}
      />

      <label>Department:</label>
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      />

      <label>Current Position:</label>
      <input
        type="text"
        name="currentPosition"
        value={formData.currentPosition}
        onChange={handleChange}
        required
      />

      <label>Company:</label>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>LinkedIn Profile:</label>
      <input
        type="url"
        name="linkedIn"
        value={formData.linkedIn}
        onChange={handleChange}
      />

      <label>Testimonial (optional):</label>
      <textarea
        name="testimonial"
        value={formData.testimonial}
        onChange={handleChange}
        placeholder="Share your experience with CDPC..."
      />

      <button type="submit" className="register-button">Register</button>
    </form>
  );
}

export default AlumniRegistrationForm;

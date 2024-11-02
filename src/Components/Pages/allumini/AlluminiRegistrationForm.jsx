import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Alumni Registration</h2>

      <label>Name:</label>
      <input
        type="text"
        style={{border:"1px solid black"}}
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Graduation Year:</label>
      <input
        type="number"
        style={{border:"1px solid black"}}
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
        style={{border:"1px solid black"}}
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      />

      <label>Current Position:</label>
      <input
        type="text"
        style={{border:"1px solid black"}}
        name="currentPosition"
        value={formData.currentPosition}
        onChange={handleChange}
        required
      />

      <label>Company:</label>
      <input
        type="text"
        name="company"
        style={{border:"1px solid black"}}
        value={formData.company}
        onChange={handleChange}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        style={{border:"1px solid black"}}

        value={formData.email}
        onChange={handleChange}
        required
      />

      <label>LinkedIn Profile:</label>
      <input
        type="url"
        name="linkedIn"
        style={{border:"1px solid black"}}

        value={formData.linkedIn}
        onChange={handleChange}
      />

      <label>Testimonial (optional):</label>
      <textarea
        name="testimonial"
        value={formData.testimonial}
        style={{border:"1px solid black"}}

        onChange={handleChange}
        placeholder="Share your experience with CDPC..."
      />

      <button type="submit">Register</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
  }
};

export default AlumniRegistrationForm;

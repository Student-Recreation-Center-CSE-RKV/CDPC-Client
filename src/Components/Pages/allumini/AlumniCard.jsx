// AlumniCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AlumniCard.css';

const AlumniCard = ({ alum }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate(`/profile/${alum.id}`);  // Navigate to profile page
    };

    return (
        <motion.div
            className={`alumni-card ${isExpanded ? 'expanded' : ''}`}
            whileHover={{ scale: isExpanded ? 1 : 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="card-main-content">
                <img
                    src={alum.photo || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                    alt={alum.name}
                    className="alumni-photo"
                />
                <div className="alumni-info">
                    <h3>{alum.name}</h3>
                    <p className="company">{alum.company}</p>
                    <p className="salary">${alum.salary}</p>
                </div>
                <button onClick={goToProfile} className="view-profile-button">
                    View Profile
                </button>
            </div>
            {isExpanded && (
                <div className="alumni-details">
                    <p><strong>Graduation Year:</strong> {alum.graduationYear}</p>
                    <p><strong>Position:</strong> {alum.position}</p>
                    <p><strong>About:</strong> {alum.bio}</p>
                </div>
            )}
        </motion.div>
    );
};

export default AlumniCard;

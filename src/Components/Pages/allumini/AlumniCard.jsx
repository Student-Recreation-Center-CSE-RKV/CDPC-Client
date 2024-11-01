import React from 'react';
import { motion } from 'framer-motion';
import './AlumniCard.css'
const AlumniCard = ({ alum }) => {
    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 allumini-card"
            style={{position:"relative"}}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div className="image-container">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="" />
            </div>
            <h3 className="text-xl font-bold text-blue-500">{alum.name}</h3>
            <p className="text-gray-600">Graduation Year: {alum.graduationYear}</p>
            <p className="text-gray-600">Company: {alum.company}</p>
            <p className="text-gray-600">Position: {alum.position}</p>
            <button style={{marginRight : "1px", marginBottom:"1px"}}>view full profile</button>
        </motion.div>
    );
};
export default AlumniCard;

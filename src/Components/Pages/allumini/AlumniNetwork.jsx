import React, { useState } from 'react';
import AlumniList from './AlumniList';
import SearchBar from './SearchBar';
import '../../../index.css';
import mockAlumniData from './mockAlumniData.json';

const AlumniNetwork = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedSalary, setSelectedSalary] = useState('');

    const filteredAlumni = mockAlumniData.filter(alum => {
        const matchesSearchTerm = alum.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  alum.company.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCompany = selectedCompany ? alum.company === selectedCompany : true;
        
        const matchesSalary = selectedSalary
            ? alum.salary <= parseInt(selectedSalary)
            : true;
        
        return matchesSearchTerm && matchesCompany && matchesSalary;
    });

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Alumni Network</h1>

            {/* Pass handlers to SearchBar */}
            <SearchBar 
                onSearch={setSearchTerm} 
                onFilterCompany={setSelectedCompany} 
                onFilterSalary={setSelectedSalary} 
            />

            <AlumniList alumni={filteredAlumni} />
        </div>
    );
};

export default AlumniNetwork;
